export class FlowDataService {

    getService() {
        return fetch('/data/flowData.json',  {headers: 
            {'Content-Type': 'application/json','Accept': 'application/json'}
        })
        .then(response => response.json());
      
    }
}