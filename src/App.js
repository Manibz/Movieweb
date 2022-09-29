import React,{useState,useEffect,target}from 'react';
import {
  Table, 
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Form,
  Navbar,
  FormControl,
  FormGroup
} from "react-bootstrap";
import axios from 'axios';
import {toast,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
const api = "http://localhost:5000/movies";
const initialState ={
  MovieName: "",
  DateofRelease: "",
  MovieUrl: "",
  MovieBudget: ""
}
function App() {
  const [state, setState] = useState(initialState);
  const [data,setData]=useState([]);
  const [movieId,setMovieID]=useState(null);
  const [editMode, setEditMode]=useState(false);

  const {MovieName, DateofRelease, MovieUrl, MovieBudget} = state;
  useEffect(() => {
  loadMovies();
  }, []);
  const loadMovies = async () => {
    const response = await axios.get(api);
   setData(response.data);
  };
  const handleChange= (e) => {
   let { MovieName,value } =e.target;
   setState({ ...state, [MovieName]: value });
  };

  const handleDelete= async (id) =>{
      if(window.confirm("Are yor sure ? Do you want  to delete "))
      {
        axios.delete(`${api}/${id}`);
        toast.success("deleted Successfully ");
        setTimeout(()=> loadMovies(), 500);
      }
  }
  const handleUpdate=(id) => {
    const singleMovie = data.find((item) => item.id==id);
    setState({...singleMovie});
    setMovieID(id);
    setEditMode(true);
  }
  const handleSubmit= (e) =>{
    e.preventDefault();
    if(!MovieName || !DateofRelease || !MovieUrl || !MovieBudget) {
      toast.error("Please Fill all details ");
    }
    else{
      if(!editMode)
      {
        axios.post(api,state);
      toast.success("Added Successfully ");
      setState({ MovieName:"", DateofRelease:"", MovieUrl:"", MovieBudget:"" })
      setTimeout(()=> loadMovies(), 500);

      }else{
      axios.put(`${api}/${movieId}`,state);
      toast.success("Updated  Successfully ");
      setState({ MovieName:"", DateofRelease:"", MovieUrl:"", MovieBudget:"" })
      setTimeout(()=> loadMovies(), 500);
      setMovieID(null);
      editMode(false);
      }
    }
  }
  return (
    <>
    <ToastContainer />
    <Navbar bg ="primary" variant="dark" className="justify-contest-center">
    <Navbar.Brand>
       Manikanta's Movie Web page 
    </Navbar.Brand>
    </Navbar>
    <Container style={{ marginTop: "70px"}}>
      <Row> 
        <Col md={4}>
       <Form onSubmit={handleSubmit}> 
        <FormGroup> 
        <Form.Label style={{textAlign: "left"}} > 
        Movie Name
        </Form.Label>
        <FormControl 
        type= "text" 
        placeholder="MovieName" 
        MovieName="MovieName" 
        value={MovieName}
        onChange={handleChange}
        />
        </FormGroup>

        <FormGroup> 
        <Form.Label style={{textAlign: "left"}} > 
         Date of Release
        </Form.Label>
        <FormControl 
        type= "text" 
        placeholder="DD/MM/YYYY" 
        DateofRelease="DateofRelease" 
        value={DateofRelease}
        onChange={handleChange}
        />
        </FormGroup>

        <FormGroup> 
        <Form.Label style={{textAlign: "left"}} > 
        Movie Url
        </Form.Label>
        <FormControl 
        type= "url" 
        placeholder="www.Baahubali.com" 
        MovieUrl="MovieUrl" 
        value={MovieUrl}
        onChange={handleChange}
        />
        </FormGroup>

        <FormGroup> 
        <Form.Label style={{textAlign: "left"}} > 
         Movie Budget
        </Form.Label>
        <FormControl 
        type= "number" 
        placeholder="1000000" 
        MovieBudget="MovieBudget" 
        value={MovieBudget}
        onChange={handleChange}
        />
        </FormGroup>
        <div className="d-grip gap-2 mt-2"> 
        <Button type="submit" variant ="primary" size="lg"> 
        submit
        </Button>
        </div>
       </Form>
        </Col>
        <Col md={8}>
          <Table bordered hover>
            <thead>
              <tr>
                <th>No. </th>
                <th>Movie Name </th>
                <th>Date of Release </th>
                <th>Movie Url</th>
                <th>Movie Budget</th>
                <th>Action</th>
              </tr>
            </thead>
             {data && data.map((item, index) => (
               <tbody key={index}>
                <tr>
                  <td>{index+1}</td>
                  <td>{item.MovieName}</td>
                  <td>{item.DateofRelease}</td>
                  <td>{item.MovieUrl}</td>
                  <td>{item.MovieBudget}</td>
                  <td>
                    <ButtonGroup>
                      <Button style = {{ marginRight: "5px"}} variant="secondary" onClick={()=>handleUpdate(item.id)}> 
                      Update
                      </Button>
                      <Button style = {{ marginRight: "5px"}} variant="danger"  onClick={() =>handleDelete(item.id)}> 
                      Delete
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
               </tbody>
             ))}
          </Table>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default App;
