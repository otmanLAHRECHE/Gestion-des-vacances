export async function getAllVacancesOfYear(token, year){
    const response = await fetch(
        '/pharm/api/get_all_vacance_of_year/' + year ,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' +token,
          },
          body: JSON.stringify()
        }
    );
    const text = await response.text();
  if (response.status === 200) {
    console.log("get the data succesfully", JSON.parse(text));
    return JSON.parse(text);
  } else {
    console.log("failed", text);
    return "no data";
  }
  };


 export async function addNewVacance(token, data){
    const response = await fetch(
        '/pharm/api/add_vacance/',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' +token,
          },
          body: data
        }
    );
    const text = await response.text();
  if (response.status === 201) {
    console.log("status 200, response: ", JSON.parse(text));
    return JSON.parse(text);
  } else {
    console.log("failed", text);
    return "error";
  }
    
    };



    

export async function deleteVacance(token, id){
            const response = await fetch(
                '/pharm/api/delete_vacance/'+id,
                {
                  method: 'DELETE',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' +token,
                  },
                  body: JSON.stringify()
                }
            );
            const text = await response.text();
  if (response.status === 200) {
    console.log("status 200, response: ", JSON.parse(text));
    return JSON.parse(text);
  } else {
    console.log("failed", text);
    return "error";
  }
            
            };


  
  export async function restartVacance(token, data){
    const response = await fetch(
        '/pharm/api/add_real_restart/',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' +token,
          },
          body: data
        }
    );
    const text = await response.text();
  if (response.status === 201) {
    console.log("status 201, response: ", JSON.parse(text));
    return JSON.parse(text);
  } else {
    console.log("failed", text);
    return "error";
  }
};