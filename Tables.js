import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardFooter, CCardHeader, CCol, CRow, CTable, CTableBody, CTableCaption, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, } from '@coreui/react'
import { DocsComponents, DocsExample } from 'src/components'
import { MdDelete, MdEdit } from 'react-icons/md'
import CustomModal from '../Modal'
import { getPosts, delPosts, updatePosts, createPosts } from '../../../services/apiService'
import { IoIosCreate } from 'react-icons/io'
import { toast } from 'react-toastify'
import "./Table.css"

const Tables = () => {
  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateBody, setUpdateBody] = useState("");
  const [postsId, setPostsId] = useState("")
  const [createPostModal, setCreatePostModal] = useState(false);
  const [userId, setUserId] = useState("")
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
      toast.success('Data fetched successfully!'); // ✅ Success message
      setCurrentUserId(userId); // Update active userId
    } catch (error) {
      toast.error('Error fetching data: ' + error.message); // ❌ Error message
      console.log(error);
    }
  };


  //Axios delete - 
  const delApi = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (!isConfirmed) return;  // ❌ Stop if user cancels

    try {
      const response = await delPosts(id)
      console.log(response.data);
      toast.success("Item deleted successfully! 🎉");
      setData((prevData) => prevData.filter((item) => item.id !== id))     // ✅ Remove deleted item from state
    } catch (error) {
      toast.error("Error deleting item: " + error.message);
      console.log(error);
    }
  };

  //Axios Update(patch method -) - 
  const updateApi = async () => {
    const body = { title: updateTitle, body: updateBody, userId: userId }
    try {
      await updatePosts(postsId, body)
      setData((prevData) => prevData.map((item) => item.id === postsId ? { ...item, title: updateTitle, body: updateBody, userId: userId } : item))
      toast.success("Item updated successfully! 🎉");
      setShowModal(false)
    } catch (error) {
      toast.error("Failed to update item. Please try again.");
      console.log(error)
    }
  }

  //Axios Create Post - 
  const createApi = async () => {
    const body = {
      title: updateTitle,
      body: updateBody,
      userId: userId,
    }

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

  const handleOpenModal = (index) => {
    console.log("index--->", index);
    setPostsId(index);
    setShowModal(true)
  }
  console.log("postID", postsId);

  const handleOpenCreateModal = () => {
    setCreatePostModal(true)
  }

  const handleIdAdd = (event) => {
    setUserId(event.target.value);
    console.log("userId", userId)
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
              <strong>React Table With Get Api : - </strong> <small>Variants</small>
              <button className='border-0' onClick={handleOpenCreateModal}><IoIosCreate size={25} /></button>
            </div>
            <CustomModal show={createPostModal}
              handleClose={() => setCreatePostModal(false)}
              handleClick={createApi}
              title="Create Table Data"
              body={
                <div className='d-flex flex-column  row-gap-2'>
                  <label id="userId">UserID</label>
                  <input type="number" id="userId " placeholder='enter a id' onChange={handleIdAdd} />

                  <label id="title">title</label>
                  <input type="text" id="title" placeholder='edit your title here' onChange={handleChange} />

                  <label id="body">body</label>
                  <input type="text" id="body" placeholder='enter a body' onChange={handleChange} />
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
                    <CTableHeaderCell scope="col">userId</CTableHeaderCell>
                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">title</CTableHeaderCell>
                    <CTableHeaderCell scope="col">body</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  {
                    data.map((item, index) => {
                      return (
                        <CTableRow color="primary">
                          <CTableHeaderCell scope="row">{item.userId}</CTableHeaderCell>
                          <CTableDataCell>{item.id}</CTableDataCell>
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
                    title="Update Table Data"
                    body={
                      <div className='d-flex flex-column  flex-wrap row-gap-2'>
                        <label id="userId">user iD</label>
                        <input type="text" id="userId" onChange={handleChange} />

                        <label id="title">title</label>
                        <input type="text" id="title" placeholder='edit your title here' onChange={handleChange} />

                        <label id="body">body</label>
                        <input type="text" id="body" onChange={handleChange} />
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
                    e.preventDefault(); // ✅ Prevents reload
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


