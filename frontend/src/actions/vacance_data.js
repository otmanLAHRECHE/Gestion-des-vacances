export async function getAllVacancesOfYear(token, year){
    const response = await fetch(
        '/app/api/get_all_vacance_of_year/' + year ,
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
      try {
          return JSON.parse(text);
        } catch (err) {
          console.error('JSON parse failed', err);
          return [];
        }
    } else {
      console.log("failed", text);
      return "no data";
    }
  
  };


 export async function addNewVacance(token, data){
    const response = await fetch(
        '/app/api/add_vacance/',
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
      return JSON.parse(text);
    } else {
      console.log("failed", text);
      return "error";
    }
    
    };

export async function deleteVacance(token, id){
            const response = await fetch(
                '/app/api/delete_vacance/'+id,
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
              return JSON.parse(text);
            } else {
              console.log("failed", text);
              return "error";
            }
            
            };