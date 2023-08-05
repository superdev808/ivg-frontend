export class OptionsService {

    getService() {
        return fetch('/data/options.json',  {headers: 
            {'Content-Type': 'application/json','Accept': 'application/json'}
        })
        .then(response => response.json()).then(d => d.data);
      
    }
}