// send form data to the endpoint
import axios from 'axios';
import { toast } from 'react-toastify';
  
// updating state for form data
export const customerContactInfoHandler = (e,customerContactInfo,setCustomerContactInfo) => {
    e.target.id === "name"  && setCustomerContactInfo({ ...customerContactInfo, name: e.target.value });
    e.target.id === "email" && setCustomerContactInfo({ ...customerContactInfo, email: e.target.value });
    e.target.id === "phone" && setCustomerContactInfo({ ...customerContactInfo, phone: e.target.value });
    e.target.id === "house_number" && setCustomerContactInfo({ ...customerContactInfo, address: {...customerContactInfo.address,house_number: parseInt(e.target.value) }});
    e.target.id === "street_name" && setCustomerContactInfo({ ...customerContactInfo, address: { ...customerContactInfo.address, ...{ street_name: e.target.value } } });
    e.target.id === "country" && setCustomerContactInfo({ ...customerContactInfo, address: {  ...customerContactInfo.address, ...{ country: e.target.value } } });
    e.target.id === "state" && setCustomerContactInfo({ ...customerContactInfo, address: { ...customerContactInfo.address, ...{ state: e.target.value } } });
    e.target.id === "city" && setCustomerContactInfo({ ...customerContactInfo, address: { ...customerContactInfo.address, ...{ city: e.target.value } } });
  };

// Submitting form data
export const sendDataHandler = (event,customerContactInfo, setCustomerContactInfo,setButtonText,setButtonDisabled) => {
        event.preventDefault(); 
        setButtonText('Submitting...');
        setButtonDisabled(true);
        document.getElementById('nameErr').innerHTML=''; 
        document.getElementById('emailErr').innerHTML=''; 
        document.getElementById('phone_numberErr').innerHTML=''; 
        document.getElementById('countryErr').innerHTML='';  
        document.getElementById('house_numberErr').innerHTML=''; 
        document.getElementById('street_nameErr').innerHTML='';  
        document.getElementById('stateErr').innerHTML='';  
        document.getElementById('cityErr').innerHTML='';  
        axios.post('http://localhost:8000/api/customer-contact', customerContactInfo)
        .then(response => 
          {
              var s = response.data;  
              if(s.hasOwnProperty('success') && s.success == 'true' )
              {  
                setCustomerContactInfo({ ...customerContactInfo,  address: {  ...customerContactInfo.address, ...{ country:''} }, });
                document.getElementById("customer-contact-form").reset();
                setCustomerContactInfo({ name:'' }); 
                toast.success('Submission succeeded!', 
                {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });

              } else if(s.hasOwnProperty('success') && s.success == "false" )
              { 
                toast.error('sorry something went wrong. please try again later.',
                {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
              setButtonText('Submit');
              setButtonDisabled(false); 
        }).catch(function (error) 
        {
          if (error.response) 
          { 
            var err = error.response.data; 
            if(err.hasOwnProperty('name'))
              document.getElementById('nameErr').innerHTML=err.name[0];
           
            if(err.hasOwnProperty('email'))
              document.getElementById('emailErr').innerHTML=err.email[0];

            if(err.hasOwnProperty('phone'))
              document.getElementById('phone_numberErr').innerHTML=err.phone[0];

            if(err.hasOwnProperty('address.country'))
              document.getElementById('countryErr').innerHTML=err['address.country'][0];

            if(err.hasOwnProperty('address.house_number'))
              document.getElementById('house_numberErr').innerHTML=err['address.house_number'][0];

            if(err.hasOwnProperty('address.street_name'))
              document.getElementById('street_nameErr').innerHTML=err['address.street_name'][0];

            if(err.hasOwnProperty('address.state'))
              document.getElementById('stateErr').innerHTML=err['address.state'][0];

            if(err.hasOwnProperty('address.city'))
              document.getElementById('cityErr').innerHTML=err['address.city'][0]; 

          } 
          setButtonText('Submit');
          setButtonDisabled(false);
        });   
  };