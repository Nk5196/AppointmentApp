import React from 'react'
import { useState,useEffect } from 'react'
import "./Homepage.css"
import axios from "axios"
import { DeleteIcon } from '@chakra-ui/icons'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

import { Box,Select, Button, Container, Flex, Heading, Input, Spacer, VStack, HStack, Switch, FormControl } from '@chakra-ui/react'
import { Appointment } from '../../Component/Appointment'
export default function Homepage() {
  // const [data,setData] = useState([])
   const [data,setData]=useState([])

   const [search, setSearch] = useState('')
   const [user,setUser] = useState({
        name:"",contact:"",
        doctor:"",channel:"",title:"",id:"",
        bp:"",temp:"",height:"",weight:"", spo2:"",
        pulse:"", reason:"", note:"",date:""
   })

   let name, value;
   const handleInputs=(e) =>{
    console.log(e)
    name=e.target.name;
    value = e.target.value

    setUser({...user, [name]:value})
    
   }
   console.log(user)

   const submitHandler = (event) =>{
    event.preventDefault();
    
    axios.post("https://my-clinic-backend-production.up.railway.app/data",user)
.then(response =>{
  // console.log(response)
  
})
.catch(error=> {
  console.log(error)
})

   }

//    const getData=()=>{
//     axios.get("https://my-clinic-backend-production.up.railway.app/data")
// .then(response =>{
//   console.log(response.data)
//    setData(response.data)
// })
// .catch(error=> {
//   console.log(error)
// })
//    }

//    getData()



useEffect(()=>{
    fetch("https://my-clinic-backend-production.up.railway.app/data")
    .then((result) => {
        result.json().then((resp)=>{

            console.log("result",resp)
            setData(resp)
        })
      
    })
})


// const clearHandler=()=> {

  
// }
   




  return (
    <Container  maxW='95%' p={4} >
    <Heading size="md" color="blue.400">Book Appointment</Heading>
    
    <Flex mt={5}>
    <Box w='35%' h='430'  boxShadow='base' >
        <Box p={3}>
          <FormControl>
        <Flex>
                 <Box w='60%' h='10' >
                    <Input type="text" placeholder='Search' onChange={event => setSearch
                      (event.target.value)}></Input>
                      {data.map((item,id) => {
                        return 
                        <>
                        <Box id={id}>
                          <Heading size="sm">{item.name}</Heading>
                        </Box>
                        </>
                      })}
                 </Box>
                   <Spacer />
                 <Box w='35%' h='10' >
                 <Button  bg='blue.400' color="white" size='md'> View Profile </Button>
                 </Box>
    </Flex>
    </FormControl>
       <Box mt={14}>
        {data.map((item)=>
           <HStack>
           <Box w="50%">{item.name}</Box>
           <Box>{item.contact}</Box>
           
         </HStack>
        )}
       </Box>

        </Box>
    </Box>
    <Spacer />
    <Box w='63%' h='430' boxShadow='base' >
      <FormControl>
       <Flex>
      
        <Box p={4} h="250px"  w="48%" boxShadow="sm">
         <VStack>
          
            <Heading color="blue.400" size="sm">Details</Heading>
            <Select  name="doctor"  onChange={handleInputs} placeholder='Select Doctor' >
                <option value='Doctor 1'>Doctor 1</option>
                <option value='Doctor 2'>Doctor 2</option>
                <option value='Doctor 3'>Doctor 3</option>
            </Select>
            <Select name="channel"  onChange={handleInputs} placeholder='Select Appointment Channel'>
                <option value='walk-In'>walk-In</option>
                <option value='By App'>By App</option>
                <option value='By Phone Call'>By Phone Call</option>
                <option value='By Email'>By Email</option>
            </Select>
            <Input name="id" value={user.id}
               onChange={handleInputs}
               placeholder='Appointment ID'>
                   </Input>
            <Select name="type" value={user.type}
               onChange={handleInputs} placeholder='Select Appointment Type'>
                <option value='Type 1'>Type 1</option>
                <option value='Type 2'>Type 2</option>
                <option value='Type 3'>Type 3</option>
            </Select>
           
         </VStack>
        </Box>
        <Spacer/>
        <Box p={4} h="250px"  w="48%" boxShadow="sm">
        <Heading mb="10px" color="blue.400" size="sm">Appointment Details</Heading>
         <VStack>
            <Input name="name" onChange={handleInputs} value={user.name} autoComplete="off" placeholder='Name'></Input>
            <Input name="contact"  onChange={handleInputs} placeholder='Contact Details'></Input>
            <HStack >
                <Heading  fontWeight="medium" size="sm">Walk-In Appointment</Heading>
            <Spacer/>
            <Switch></Switch>
            </HStack>
           <Input   placeholder="Select Date and Time" name="date" onChange={handleInputs} size="md" type="datetime-local"></Input>
         </VStack>
           
        </Box>
       </Flex>
       <Box>
        <Heading p="5px" color="blue.400" size="sm">Vital Information</Heading>
       <Flex >
        <Input name="bp" onChange={handleInputs} m={.5} placeholder="BP"></Input>
        <Input name="temp" onChange={handleInputs} m={.5}  placeholder="Temp"></Input>
        <Input name="height" onChange={handleInputs} m={.5}  placeholder="Height"></Input>
        <Input name="weight" onChange={handleInputs} m={.5} placeholder="Weight"></Input>
        <Input name="spo2" onChange={handleInputs} m={.5} placeholder="SPO2"></Input>
        <Input name="pulse" onChange={handleInputs} m={.5}  placeholder="Pulse Rate"></Input>
       </Flex>
       </Box>
       <Flex>
        <Input name="reason" onChange={handleInputs}   m={.5} placeholder='Reason'></Input>
        <Spacer/>
        <Input m={.5} name="note" onChange={handleInputs}  placeholder='Note for Doctor'></Input>
       </Flex>
       <Flex>
        <Spacer></Spacer>
        <Button m={3} bg="blue.400" type='reset'  color="white">Reset</Button>
        
        <Button m={3} bg="blue.400" onClick={submitHandler} color="white">Submit</Button>
        <Spacer></Spacer>
       </Flex>
       
       </FormControl>
    </Box>
   
  </Flex>
  <Box>
  <>
        <Heading mt={5} mb={5} size="md" color="blue.400">Appointments</Heading>
        <Box>
        <TableContainer>
  <Table size='sm'>
    <Thead>
      <Tr>
        <Th>Full Name</Th>
        <Th>Contact No.</Th>
        <Th>Appointment reason</Th>
        <Th>Date & Time</Th>
        <Th>ID</Th>
        <Th>Channel</Th>
        <Th >Action</Th>
      </Tr>
    </Thead>
    <Tbody>
        {data.map((item) => 
         <Tr>
         <Td>{item.name}</Td>
         <Td>{item.contact}</Td>
         <Td >{item.reason}</Td>
         <Td>{item.date}</Td>
         <Td>{item.id}</Td>
         <Td>{item.channel}</Td>
         <Td><Button size="sm"   variant='solid'>
    edit
  </Button></Td>
       </Tr>
        )}
     
      </Tbody>
    
  </Table>
</TableContainer>
        </Box>
    </>
  </Box>
    </Container>
  )
}
