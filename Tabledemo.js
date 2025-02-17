import React, { useEffect, useState } from 'react'
import {CCard,CCardBody,CCardHeader,CCol,CRow,CTable,CTableBody,CTableCaption, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { getPost, deletePost, updatePost, createPost } from '../../../services/apiServices'
import { MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify'
import { FaEdit } from 'react-icons/fa'
import { IoCreateSharp } from 'react-icons/io5'
import CustomModal from '../../../Modal'

const Tables = () => {
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  const [createPostModal, setCreatePostModal] = useState(false)
  const [userId, setUserId] = useState('')
  const [updateTitle, setUpdateTitle] = useState('')
  const [updateBody, setUpdateBody] = useState('')
  const [postsId, setPostsId] = useState('')
  const [formError, setFormError] = useState({})


  console.log('userId', userId)
  console.log('updateTitle', updateTitle)
  console.log('updateBody', updateBody)


  //get api -
  const getPostData = async () => {
    try {
      const response = await getPost()
      console.log(response.data)
      toast.success('Data fetched successfully')
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  //delete Api
  const deletePostData = async (id) => {
    try {
      const response = await deletePost(id)
      console.log(response.data)
      toast.info('Data deleted successfully')
      setData(data.filter((item) => item.id !== id))
      /*How work:filter is process of selecting a element and check condition if satisfy then return new array
         here data me jo all item get ho rha hai uspe filter laga k all item ki id le k hum jo id pe click kr rhe(id function k parameter wala) us se compare agar equal nhi wapas set kr de rha hai agar hamari id match hone par usko wo set nhi kr raha wapas data me dts y its remove from UI. */
    } catch (error) {
      console.log(error)
      toast.error('An error occurred while deleting data')
    }
  }

  //Update a data -
  const updatePostData = async () => {
    const body = { userId: userId, title: updateTitle, body: updateBody } //body is object where pass all this !
    try {
      const response = await updatePost(postsId, body)
      console.log(response.data)
      setData((prevData) => prevData.map((item) =>item.id === postsId ? { ...item, title: updateTitle, body: updateBody, userId: userId }
      : item,))
      toast.success('Item updated successfully! 🎉')
      handleClose()
    } catch (error) {
      toast.error('Failed to update item. Please try again.')
      console.log(error)
    }
  }

  //create api
  const createPostData = async () => {
    const body = { userId, title: updateTitle, body: updateBody }

    try {
      const response = await createPost(body) // Call createPost API
      console.log(response.data)

      setData((prevData) => [...prevData, response.data]) // Add new item to table
      toast.success('Item created successfully! 🎉')

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

  const handleShow = (id, index) => {
    setPostsId(index)
    const selectedPost = data.find((item) => item.id === id)
    if (selectedPost) {
      setUserId(selectedPost.userId)
      setUpdateTitle(selectedPost.title)
      setUpdateBody(selectedPost.body)
    }
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
    setCreatePostModal(false)
  }

  // const handleChange = (e) => {
  //   if (e.target.id === 'userId') {
  //     setUserId(e.target.value)
  //   } else if (e.target.id === 'title') {
  //     setUpdateTitle(e.target.value)
  //   } else if (e.target.id === 'body') {
  //     setUpdateBody(e.target.value)
  //   }
  // }

  //handlechange function accroding to validation
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'userId') {
      setUserId(value);
      setFormError((prev) => ({ ...prev, userId: '' })); // Clear error for userId
    } else if (id === 'title') {
      setUpdateTitle(value);
      setFormError((prev) => ({ ...prev, updateTitle: '' })); // Clear error for title
    } else if (id === 'body') {
      setUpdateBody(value);
      setFormError((prev) => ({ ...prev, updateBody: '' })); // Clear error for body
    }
  };
  

  const handleOpencreateModal = () => {
    setUserId('');      // Reset userId
    setUpdateTitle(''); // Reset title
    setUpdateBody('');  // Reset body  (so that previous values are not shown of edit modal ka)
    setFormError({});   // Clear validation errors also (so that previous errors are not shown)
    setCreatePostModal(true)
  }

  //validation code
  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validate(userId, updateTitle, updateBody)
    setFormError(errors)

    if (Object.keys(errors).length === 0) {
      createPostData() // Call API only if no validation errors
    }
  }

  const validate = (userId, updateTitle, updateBody) => {
    const error = {}
    if (!userId) {
      error.userId = 'User Id is required'
    }
    if (!updateTitle) {
      error.updateTitle = 'Title is required'
    }
    if (!updateBody) {
      error.updateBody = 'Body is required'
    }
    return error
  }

  useEffect(() => {
    getPostData()
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="d-flex justify-content-between">
              <strong>REACT CRUD OPERATION: </strong>
              <button className="border-0" onClick={handleOpencreateModal}>
                <IoCreateSharp size={25} />
              </button>
            </div>
            <CustomModal
              show={createPostModal}
              handleClose={() => setCreatePostModal(false)}
              title="Creating a data"
              body={
                <div className="d-flex flex-column row-gap-2">
                  <label id="userId">UserId</label>
                  <input
                    type="number"
                    id="userId"
                    placeholder="enter a user Id"
                    value={userId}
                    onChange={handleChange}
                  />
                   {formError.userId && <span className="text-danger">{formError.userId}</span>}

                  <label id="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    placeholder="enter a title"
                    value={updateTitle}
                    onChange={handleChange}
                  />
               {formError.updateTitle && <span className="text-danger">{formError.updateTitle}</span>}
                  <label id="body">Body</label>
                  <input
                    type="text"
                    id="body"
                    placeholder="enter a body"
                    value={updateBody}
                    onChange={handleChange}
                  />
                   {formError.updateBody && <span className="text-danger">{formError.updateBody}</span>}
                </div>
              }
              primaryAction={handleSubmit} // Run validation first before calling createPostData (for create button)
              secondaryAction={handleClose} //for cancel button
              primaryText="Create"
              secondaryText="Cancel"
            />
          </CCardHeader>
          <CCardBody>
            <DocsExample href="components/table#variants">
              <CTable>
                <CTableHead>
                  <CTableRow>
                  <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                    <CTableHeaderCell scope="col">UserID</CTableHeaderCell>     
                    <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Body</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((item, index) => {
                    return (
                      <CTableRow color="primary" key={index}>
                      <CTableDataCell>{item.id}</CTableDataCell>
                        <CTableHeaderCell scope="row">{item.userId}</CTableHeaderCell>              
                        <CTableDataCell>{item.title}</CTableDataCell>
                        <CTableDataCell>{item.body}</CTableDataCell>

                        <CTableDataCell>
                          <MdDelete
                            size={20}
                            onClick={() => {
                              deletePostData(item.id)
                            }}
                          />
                        </CTableDataCell>

                        <CTableDataCell>
                          <FaEdit
                            size={20}
                            onClick={() => {
                              handleShow(item.id)
                            }}
                          />
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}

                  <CustomModal
                    title="Updating a data"
                    body={
                      <div className="d-flex flex-column row-gap-2">
                        <label id="userId">UserId</label>
                        <input
                          type="number"
                          id="userId"
                          placeholder="enter a user Id"
                          value={userId}
                          onChange={handleChange}
                        />

                        <label id="title">Title</label>
                        <input
                          type="text"
                          id="title"
                          placeholder="enter a title"
                          value={updateTitle}
                          onChange={handleChange}
                        />

                        <label id="body">Body</label>
                        <input
                          type="text"
                          id="body"
                          placeholder="enter a body"
                          value={updateBody}
                          onChange={handleChange}
                        />
                      </div>
                    }
                    show={show}
                    handleClose={handleClose}
                    primaryAction={updatePostData} //for update and save
                    secondaryAction={handleClose} //for cancel button
                    primaryText="Update"
                    secondaryText="Cancel"
                  />
                </CTableBody>
              </CTable>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tables
