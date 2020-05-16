import React, { useState, Component ,useEffect } from "react";
import ReactDOM from "react-dom";

function App() {
 const [serviceList, setserviceList] = useState([]);
 const [providerList, setproviderList] = useState([]);
 const [filteredproviderList, setfilteredproviderList] = useState([]);

 //fetch services list
  useEffect(() => {
    fetch(
      `https://api.inquickerstaging.com/v3/winter.inquickerstaging.com/services`,
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(response => {
        setserviceList(response);       
      })
      .catch(error => console.log(error));
  }, []);

  //fetch provider list
   useEffect(() => {
    fetch(
      `https://api.inquickerstaging.com/v3/winter.inquickerstaging.com/providers?include=locations,schedules.location&page[number]=1&page[size]=10`,
       { mode: 'no-cors' },{ method: "GET"})
      .then(res => res.json())
      .then(response => {
        setproviderList(response);       
      })
      .catch(error => console.log(error));
  }, []);   
     
 let ServicesToRender;
  if (serviceList && serviceList.data) {    
    ServicesToRender =  serviceList.data.map((item,i) => {       
      return <div onClick={() => handleClick(item.id)} key={item.id}>{item.id}</div>;
    });
  }


  let FilteredProviderListToRender;
  function handleClick(id)
  {
     var updatedList = serviceList;
         updatedList = updatedList.data.filter((item => {
        return item.attributes.service.search(id) !== -1;
        }));
    setfilteredproviderList(updatedList);
    FilteredProviderListToRender =  filteredproviderList.data.map((item,i) => {
      return <div key={item.id}>{item.id}</div>;
    });
  }
  
  let ProvidersToRender;
  if (providerList && providerList.data) {
    ProvidersToRender =  providerList.data.map((item,i) => {
      return <div key={item.id}>{item.id}</div>;
    });
  }

 //render
  return( <div>
  <h1><span>Control List</span></h1>
  {ServicesToRender}
  

  <h1><span>Services List</span></h1>
  {FilteredProviderListToRender ? FilteredProviderListToRender : ProvidersToRender} </div>  
  
  );
  
}

export default App;
