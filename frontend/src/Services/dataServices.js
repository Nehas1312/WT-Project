import axios from 'axios'
const baseUrl = 'http://localhost:8086/api/tasks'



const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

const postData = (addtask) => {
    const request = axios.post(baseUrl,addtask)
    return request.then(response => response.data)
}

const updateData = (taskId, updatedTask) => {
    const request = axios.put(`${baseUrl}/${taskId}`, updatedTask);
    return request.then(response => response.data);
  };

  const deleteData = (taskId) => {
    const request = axios.delete(`${baseUrl}/${taskId}`);
    return request.then(response => response.data);
  };
  

export default{
    postData,getAll,updateData,deleteData
}