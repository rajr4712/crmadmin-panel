import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableCaption, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, } from '@coreui/react'
import { DocsComponents, DocsExample } from 'src/components'
import axios from 'axios'
import { MdDelete, MdEdit } from 'react-icons/md'
import CustomModal from '../Modal'
import { getPosts,delPosts , updatePosts} from '../../../services/apiService'
import { IoCreateOutline } from 'react-icons/io5'
import { IoIosCreate } from 'react-icons/io'

const Tables = () => {
  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [updateTitle , setUpdateTitle] = useState("");
  const [postsId, setPostsId] = useState("")
  const [createPostModal , setCreatePostModal] = useState(false);

  
  //Axios get - 
  const getApi = async () => {
    try {
      const response = await getPosts()
      const data = response.data;
      console.log(data);
      setData(data);
    } catch (error) {
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
      setData((prevData) => prevData.filter((item) =>item.id !== id))     // ✅ Remove deleted item from state
    } catch (error) {
      console.log(error);
    }
  };


  //Axios Update(patch method -) - 
  const updateApi = async() => {
    console.log(updateTitle)
    const body = { title:updateTitle}  //Body object create
    try {
      await updatePosts(postsId,body) 
      setData((prevData) => prevData.map((item) => item.id === postsId ? {...item, title: updateTitle} : item))
      setShowModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  
//Axios Create Post - 
const createApi = async() => {
  try {
    const response = await createPosts();
  } catch(err) {
    console.log(err)
  }
}


  const handleChange = (event) => {
   setUpdateTitle(event.target.value);
  }

  const handleOpenModal = (index) => {
    console.log("index--->" , index);
    setPostsId(index);
    setShowModal(true)
  }
  console.log("postID",postsId);
   
const handleOpenCreateModal = () => {
  setCreatePostModal(true)

}
  useEffect(() => {
    getApi();
  },[])


  return (
    <CRow>
      {/*My Table */}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className='d-flex justify-content-between'>
            <strong>React Table With Get Api : - </strong> <small>Variants</small>
            <button className='border-0' onClick={handleOpenCreateModal}><IoIosCreate size={25}/></button>
            </div> 
                <CustomModal show={createPostModal}
                    handleClose={() => setCreatePostModal(false)}
                    handleClick={createApi}
                    title="Custom Modal Title"
                    body= {
                      <div>
                        <label id="title">title</label>
                        <input type ="text" id="title" placeholder='edit your title here' />

                        <label>TableID</label>
                        <input type="number" placeholder='enter a id'/>
                      </div>
                    }
                    primaryText="Update" 
                    secondaryText="Cancel"
                  />
          </CCardHeader>
          <CCardBody>
            <DocsExample href="components/table#variants">
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">userId</CTableHeaderCell>
                    <CTableHeaderCell scope="col">TableID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">title</CTableHeaderCell>
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
                          <CTableDataCell className='d-flex edit-delete-con'>
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
                    title="Custom Modal Title"
                    body= {
                      <div>
                        <label id="title">title</label>
                        <input type ="text" id="title" placeholder='edit your title here' onChange={handleChange} />
                      </div>
                    }
                    primaryText="Update" 
                    secondaryText="Cancel"
                  />
                </CTableBody>
              </CTable>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Table</strong> <small>Striped rows</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Use <code>striped</code> property to add zebra-striping to any table row within the{' '}
              <code>&lt;CTableBody&gt;</code>.
            </p>
            <DocsExample href="components/table#striped-rows">
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>Mark</CTableDataCell>
                    <CTableDataCell>Otto</CTableDataCell>
                    <CTableDataCell>@mdo</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">2</CTableHeaderCell>
                    <CTableDataCell>Jacob</CTableDataCell>
                    <CTableDataCell>Thornton</CTableDataCell>
                    <CTableDataCell>@fat</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">3</CTableHeaderCell>
                    <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
                    <CTableDataCell>@twitter</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </DocsExample>
            <p className="text-body-secondary small">
              These classes can also be added to table variants:
            </p>
            <DocsExample href="components/table#striped-rows">
              <CTable color="dark" striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>Mark</CTableDataCell>
                    <CTableDataCell>Otto</CTableDataCell>
                    <CTableDataCell>@mdo</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">2</CTableHeaderCell>
                    <CTableDataCell>Jacob</CTableDataCell>
                    <CTableDataCell>Thornton</CTableDataCell>
                    <CTableDataCell>@fat</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">3</CTableHeaderCell>
                    <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
                    <CTableDataCell>@twitter</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </DocsExample>
            <DocsExample href="components/table#striped-rows">
              <CTable color="success" striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>Mark</CTableDataCell>
                    <CTableDataCell>Otto</CTableDataCell>
                    <CTableDataCell>@mdo</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">2</CTableHeaderCell>
                    <CTableDataCell>Jacob</CTableDataCell>
                    <CTableDataCell>Thornton</CTableDataCell>
                    <CTableDataCell>@fat</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">3</CTableHeaderCell>
                    <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
                    <CTableDataCell>@twitter</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>  
     
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Table</strong> <small>Hoverable rows</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Use <code>hover</code> property to enable a hover state on table rows within a{' '}
              <code>&lt;CTableBody&gt;</code>.
            </p>
            <DocsExample href="components/table#hoverable-rows">
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>Mark</CTableDataCell>
                    <CTableDataCell>Otto</CTableDataCell>
                    <CTableDataCell>@mdo</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">2</CTableHeaderCell>
                    <CTableDataCell>Jacob</CTableDataCell>
                    <CTableDataCell>Thornton</CTableDataCell>
                    <CTableDataCell>@fat</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">3</CTableHeaderCell>
                    <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
                    <CTableDataCell>@twitter</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </DocsExample>
            <DocsExample href="components/table#hoverable-rows">
              <CTable color="dark" hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>Mark</CTableDataCell>
                    <CTableDataCell>Otto</CTableDataCell>
                    <CTableDataCell>@mdo</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">2</CTableHeaderCell>
                    <CTableDataCell>Jacob</CTableDataCell>
                    <CTableDataCell>Thornton</CTableDataCell>
                    <CTableDataCell>@fat</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">3</CTableHeaderCell>
                    <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
                    <CTableDataCell>@twitter</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </DocsExample>
            <DocsExample href="components/table#hoverable-rows">
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>Mark</CTableDataCell>
                    <CTableDataCell>Otto</CTableDataCell>
                    <CTableDataCell>@mdo</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">2</CTableHeaderCell>
                    <CTableDataCell>Jacob</CTableDataCell>
                    <CTableDataCell>Thornton</CTableDataCell>
                    <CTableDataCell>@fat</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">3</CTableHeaderCell>
                    <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
                    <CTableDataCell>@twitter</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    
     <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Table</strong> <small>Bordered tables</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Add <code>bordered</code> property for borders on all sides of the table and cells.
            </p>
            <DocsExample href="components/table#bordered-tables">
              <CTable bordered>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>Mark</CTableDataCell>
                    <CTableDataCell>Otto</CTableDataCell>
                    <CTableDataCell>@mdo</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">2</CTableHeaderCell>
                    <CTableDataCell>Jacob</CTableDataCell>
                    <CTableDataCell>Thornton</CTableDataCell>
                    <CTableDataCell>@fat</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">3</CTableHeaderCell>
                    <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
                    <CTableDataCell>@twitter</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </DocsExample>
            <p className="text-body-secondary small">
              <a href="https://coreui.io/docs/utilities/borders#border-color">
                Border color utilities
              </a>{' '}
              can be added to change colors:
            </p>
            <DocsExample href="components/table#bordered-tables">
              <CTable bordered borderColor="primary">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>Mark</CTableDataCell>
                    <CTableDataCell>Otto</CTableDataCell>
                    <CTableDataCell>@mdo</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">2</CTableHeaderCell>
                    <CTableDataCell>Jacob</CTableDataCell>
                    <CTableDataCell>Thornton</CTableDataCell>
                    <CTableDataCell>@fat</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">3</CTableHeaderCell>
                    <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
                    <CTableDataCell>@twitter</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
   
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Table</strong> <small>Tables without borders</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Add <code>borderless</code> property for a table without borders.
            </p>
            <DocsExample href="components/table#tables-without-borders">
              <CTable borderless>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>Mark</CTableDataCell>
                    <CTableDataCell>Otto</CTableDataCell>
                    <CTableDataCell>@mdo</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">2</CTableHeaderCell>
                    <CTableDataCell>Jacob</CTableDataCell>
                    <CTableDataCell>Thornton</CTableDataCell>
                    <CTableDataCell>@fat</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">3</CTableHeaderCell>
                    <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
                    <CTableDataCell>@twitter</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </DocsExample>
            <DocsExample href="components/table#tables-without-borders">
              <CTable color="dark" borderless>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>Mark</CTableDataCell>
                    <CTableDataCell>Otto</CTableDataCell>
                    <CTableDataCell>@mdo</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">2</CTableHeaderCell>
                    <CTableDataCell>Jacob</CTableDataCell>
                    <CTableDataCell>Thornton</CTableDataCell>
                    <CTableDataCell>@fat</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">3</CTableHeaderCell>
                    <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
                    <CTableDataCell>@twitter</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      
    
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Table</strong> <small>Vertical alignment</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Table cells of <code>&lt;CTableHead&gt;</code> are always vertical aligned to the
              bottom. Table cells in <code>&lt;CTableBody&gt;</code> inherit their alignment from{' '}
              <code>&lt;CTable&gt;</code> and are aligned to the the top by default. Use the align
              property to re-align where needed.
            </p>
            <DocsExample href="components/table#vertical-alignment">
              <CTable align="middle" responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col" className="w-25">
                      Heading 1
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="w-25">
                      Heading 2
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="w-25">
                      Heading 3
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="w-25">
                      Heading 4
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>
                      This cell inherits <code>vertical-align: middle;</code> from the table
                    </CTableDataCell>
                    <CTableDataCell>
                      This cell inherits <code>vertical-align: middle;</code> from the table
                    </CTableDataCell>
                    <CTableDataCell>
                      This cell inherits <code>vertical-align: middle;</code> from the table
                    </CTableDataCell>
                    <CTableDataCell>
                      This here is some placeholder text, intended to take up quite a bit of
                      vertical space, to demonsCTableRowate how the vertical alignment works in the
                      preceding cells.
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow align="bottom">
                    <CTableDataCell>
                      This cell inherits <code>vertical-align: bottom;</code> from the table row
                    </CTableDataCell>
                    <CTableDataCell>
                      This cell inherits <code>vertical-align: bottom;</code> from the table row
                    </CTableDataCell>
                    <CTableDataCell>
                      This cell inherits <code>vertical-align: bottom;</code> from the table row
                    </CTableDataCell>
                    <CTableDataCell>
                      This here is some placeholder text, intended to take up quite a bit of
                      vertical space, to demonsCTableRowate how the vertical alignment works in the
                      preceding cells.
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>
                      This cell inherits <code>vertical-align: middle;</code> from the table
                    </CTableDataCell>
                    <CTableDataCell>
                      This cell inherits <code>vertical-align: middle;</code> from the table
                    </CTableDataCell>
                    <CTableDataCell align="top">This cell is aligned to the top.</CTableDataCell>
                    <CTableDataCell>
                      This here is some placeholder text, intended to take up quite a bit of
                      vertical space, to demonsCTableRowate how the vertical alignment works in the
                      preceding cells.
                    </CTableDataCell>
                  </CTableRow>
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
