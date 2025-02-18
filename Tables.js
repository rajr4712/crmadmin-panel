import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardFooter, CCardHeader, CCol, CRow, CTable, CTableBody, CTableCaption, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, } from '@coreui/react'
import { DocsComponents, DocsExample } from 'src/components'
import { MdDelete, MdEdit } from 'react-icons/md'
import CustomModal from '../Modal'
import { getPosts, delPosts, updatePosts, createPosts } from '../../../services/apiService'
import { IoIosCreate } from 'react-icons/io'
import { toast } from'react-toastify'
import "./Table.css"
import SweetAlert from '../../../SweetAlert/Swal'

const Tables = () => {
  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("")
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateBody, setUpdateBody] = useState("");
  const [postsId, setPostsId] = useState("")
  const [createPostModal, setCreatePostModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(1);           //currentUserId is used for pagination .
  const [formError, setFormError] = useState({})

  console.log(currentUserId);
  console.log("title", updateTitle);
  console.log("id", userId);
  console.log("body", updateBody);
  console.log("postId", postsId);
  console.log("formError", formError);


  //Axios get - 
  const getApi = async (userId = 1) => {
    try {
      const response = await getPosts(userId)
      const data = response.data;
      toast.success('Data fetched successfully!'); 
      setData(data); 
      setCurrentUserId(userId); // Update active userId
    } catch (error) {
      toast.error('Error fetching data: ' + error.message); 
      console.log(error);
    }
  };


  //Axios delete - 
  const delApi = async (id) => {
    // const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    // if (!isConfirmed) return;  // Stop if user cancels

    const isConfirmed = await SweetAlert("");
    if (!isConfirmed) return;  

    try {
      const response = await delPosts(id)
      console.log(response.data);
      toast.success("Item deleted successfully! 🎉");
      setData((prevData) => prevData.filter((item) => item.id !== id))   // Remove deleted item from state
    } catch (error) {
      toast.error("Error deleting item: " + error.message);
      console.log(error);
    }
  };


  //Axios Update(patch method -) - 
  const updateApi = async () => {
    const body = { title: updateTitle, body: updateBody, userId: userId }
    try {
     const response = await updatePosts(postsId, body)
     console.log(response.data);
      setData((prevData) => prevData.map((item) => item.id === postsId ? { ...item, title: updateTitle, body: updateBody, userId: userId } : item))
      setShowModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  //Axios Create Post - 
  const createApi = async () => {
    const body = { title: updateTitle,  body: updateBody, userId: userId}
    try {
      const response = await createPosts(postsId, body);
      setData((prevData) => [...prevData, response.data]);
      toast.success("Item created successfully! ");
      // Clear input fields after successful creation
      setUserId('')
      setUpdateTitle('')
      setUpdateBody('')
      setFormError({}) // Clear validation errors
      setCreatePostModal(false)
    } catch (error) {
      toast.error('Failed to create item. Please try again.')
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'userId') {
      setUserId(value);
      setFormError((prev) => ({ ...prev, userId: '' })); // Clear error for userId of prvs value same as below code !
    } else if (id === 'title') {
      setUpdateTitle(value);
      setFormError((prev) => ({ ...prev, updateTitle: '' }));
    } else if (id === 'body') {
      setUpdateBody(value);
      setFormError((prev) => ({ ...prev, updateBody: '' })); 
    }444444
  };
  

  const handleOpenModal = (id) => {
    const selectedPost = data.find((item) => item.id === id);
    if (selectedPost) {
      setPostsId(selectedPost.id);
      setUpdateTitle(selectedPost.title);
      setUpdateBody(selectedPost.body);
      setUserId(selectedPost.userId);
      setShowModal(true);
    }
  };
  
  const handleOpenCreateModal = () => {
    setUserId('');      // Reset userId
    setUpdateTitle(''); // Reset title
    setUpdateBody('');  // Reset body  (so that previous values are not shown of edit modal ka)
    setFormError({});   // Clear validation errors also (so that previous errors are not shown)
    setCreatePostModal(true)
  }


  const validate = (userId, updateTitle, updateBody) => {
    const error = {}
    if (!userId) {
      error.userId = 'User Id is required'    //if user id is empty then error message(User Id is required) is stored in the error object.
    }
    if (!updateTitle) {
      error.updateTitle = 'Title is required'
    }
    if (!updateBody) {
      error.updateBody = 'Body is required'
    }
    return error
  }

 //validation code
 const handleSubmit = (e) => {
  e.preventDefault()
  const errors = validate(userId, updateTitle, updateBody)
  setFormError(errors)

  if (Object.keys(errors).length === 0) {
    createApi() // Call API only if no validation errors
  }
}


  //pagination
  const handlePageClick = (userId) => {
    setCurrentUserId(userId);
    getApi(userId);
  };

  useEffect(() => {
    getApi();
  }, [])


  return (
    <CRow>
     {/*My Table */}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className='d-flex justify-content-between'>
              <strong>React CRUD Post </strong>
              <button className='border-0' onClick={handleOpenCreateModal}><IoIosCreate size={25} /></button>
            </div>
            <CustomModal show={createPostModal}
              handleClose={() => setCreatePostModal(false)}
              handleClick={handleSubmit} 
              title="Add Post"
              body={
                <div  className='d-flex flex-column  row-gap-2'>
                  <label id="userId">UserID<span className='text-danger'>*</span></label>
                  <input type="number" id="userId" placeholder='enter a user id' value={userId} onChange={handleChange} required/>
                  {formError.userId && <span className="text-danger">{formError.userId}</span>}

                  <label id="title">title<span className='text-danger'>*</span></label>
                  <input type="text" id="title" placeholder='edit your title here' value={updateTitle} onChange={handleChange} required/>
                  {formError.updateTitle && <span className="text-danger">{formError.updateTitle}</span>}

                  <label id="body">body<span className='text-danger'>*</span></label>
                  <input type="text" id="body" placeholder='enter a body' value={updateBody} onChange={handleChange} required/>
                  {formError.updateBody && <span className="text-danger">{formError.updateBody}</span>}
                </div>
              } 
              primaryText="Add"
              secondaryText="Cancel"
            />
          </CCardHeader>
          <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">UserId</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Body</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Body</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  {
                    data.map((item, index) => {
                      return (
                        <CTableRow color="primary">
                            <CTableDataCell>{item.id}</CTableDataCell>
                          <CTableHeaderCell scope="row">{item.userId}</CTableHeaderCell>                    
                          <CTableDataCell>{item.title}</CTableDataCell>
                          <CTableDataCell>{item.body}</CTableDataCell>
                          <CTableDataCell>{item.body}</CTableDataCell>
                          <CTableDataCell className='d-flex w-100 h-100 py-4 column-gap-2'>
                            <button onClick={() => handleOpenModal(item.id)}><MdEdit /></button>
                            <button onClick={() => delApi(item.id)}><MdDelete /></button>
                          </CTableDataCell>
                        </CTableRow>
                      )
                    })
                  }
                  <CustomModal show={showModal}
                    handleClose={() => setShowModal(false)}
                    handleClick={updateApi}
                    title="Update Post"
                    body= {   
                      <div className='d-flex flex-column  flex-wrap row-gap-2'>
                        <label id="userId">user iD</label>
                        <input type="number" id="userId" value={userId} onChange={handleChange} required/>     

                        <label id="title">title</label>
                        <input type="text" id="title" value={updateTitle} placeholder='edit your title here' onChange={handleChange}  required/>

                        <label id="body">body</label>
                        <input type="text" id="body" value={updateBody} onChange={handleChange} required/>
                      </div>
                    }
                    primaryText="Update"
                    secondaryText="Cancel"
                  />
                </CTableBody>
              </CTable>
     
          </CCardBody>

          <CCardFooter>
            <div className="pagination">
              <a href="#" onClick={(e) => { e.preventDefault(); handlePageClick(Math.max(1, currentUserId - 1)) }}>&laquo;</a>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <a
                  key={num}
                  href="#"
                  className={currentUserId === num ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault(); //by default reload stop !
                    handlePageClick(num);
                  }}
                >
                  {num}
                </a>
              ))}
              <a href="#" onClick={(e) => { e.preventDefault(); handlePageClick(Math.min(6, currentUserId + 1)) }}>&raquo;</a>
            </div>
          </CCardFooter>

        </CCard>
      </CCol>

    </CRow>
  )
}

export default Tables

