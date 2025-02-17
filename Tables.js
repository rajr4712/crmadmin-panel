


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
  const [currentUserId, setCurrentUserId] = useState(1);

  console.log(currentUserId);
  console.log("title", updateTitle);
  console.log("id", userId);
  console.log("body", updateBody);



  //Axios get - 
  const getApi = async (userId = 1) => {
    try {
      const response = await getPosts(userId)
      const data = response.data;
      setData(data);
      toast.success('Data fetched successfully!'); 
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
      setData((prevData) => prevData.filter((item) => item.id !== id))     // Remove deleted item from state
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
    //validation for empty fields
    if (!updateTitle.trim() || !updateBody.trim() || !userId.trim()) {
      toast.warning("All fields are required!");
      return;
    }
    const body = { title: updateTitle,  body: updateBody, userId: userId}
    try {
      const response = await createPosts(postsId, body);
      setData((prevData) => [...prevData, response.data]);
      toast.success("Item created successfully! ");
      setCreatePostModal(false)
    } catch (err) {
      toast.warning("Failed to create item. Please try again.");
      console.log(err)
    }
  }

  //onchange function for input field
  const handleChange = (event) => {
    const { id, value } = event.target;
    if (id === "title") {
      setUpdateTitle(value);
    } else if (id === "body") {
      setUpdateBody(value);
    } else if (id === "userId") {
      setUserId(value)
    }
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
    setCreatePostModal(true)
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
              <strong>React Table Post Data </strong>
              <button className='border-0' onClick={handleOpenCreateModal}><IoIosCreate size={25} /></button>
            </div>
            <CustomModal show={createPostModal}
              handleClose={() => setCreatePostModal(false)}
              handleClick={createApi} 
              title="Add Post"
              body={
                <div  className='d-flex flex-column  row-gap-2'>
                  <label id="userId">UserID</label>
                  <input type="number" id="userId" placeholder='enter a user id' value={userId} onChange={handleChange} required/>

                  <label id="title">title</label>
                  <input type="text" id="title" placeholder='edit your title here' value={updateTitle} onChange={handleChange} required/>

                  <label id="body">body</label>
                  <input type="text" id="body" placeholder='enter a body' value={updateBody} onChange={handleChange} required/>
                </div>
              } 
              primaryText="Save"
              secondaryText="Cancel"
            />
          </CCardHeader>
          <CCardBody>
            <DocsExample href="components/table#variants">
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">UserId</CTableHeaderCell>
                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Title</CTableHeaderCell>
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
                          <CTableDataCell className='d-flex edit-delete-icon'>
                            <button onClick={() => handleOpenModal(item.id)}><MdEdit /></button>
                            <button onClick={() => delApi(item.id)} className='ms-2'><MdDelete /></button>
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
            </DocsExample>
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
