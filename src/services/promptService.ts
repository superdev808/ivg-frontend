export class PromptService {
    getService() {
        return fetch('/data/prompts.json',  {headers: 
            {'Content-Type': 'application/json','Accept': 'application/json'}
        })
        .then(response => response.json()).then(d => d.data);
      
    }
}