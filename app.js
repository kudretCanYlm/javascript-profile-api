/* bunun aslında profilede olması lazım ama hata veriyor */
class ProfileClass
{
    constructor()
    {
        this.clientid="",
        this.clientsecret=""

    }
    async getProfile(username)
    {
        
            const profileResponse=await fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`);

            const profile=await profileResponse.json();
    
            const todoResponse=await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${profile[0].id}`)
            const todo=await todoResponse.json();
            return {
                profile,todo
            }
        
        
          
    }
}
/*************************** */
/* UI sınıfınıda okumuyor */
class UI{
    constructor(){
        this.profileContainer=document.getElementById("profileContainer");
        this.alert=document.getElementById("alert");
        this.todoList=document.querySelector(".list ul");
    }
   showProfile(profile){
       this.profileContainer.innerHTML=
       `
       <div class="card card-body">
       <div class="row">
           <div class="col-md-3">
           <img src="https://i.stack.imgur.com/y9DpT.jpg" style="width: 300px;" class="img-thumbnail">
           </div>
           <div class="col-md-9">
                 <h4>Contact</h4>
                 <ul class="list-group">
                     <li class="list-group-item">
                        name: ${profile.name}
                     </li>
                     <li class="list-group-item">
                        username: ${profile.username}
                     </li>
                     <li class="list-group-item">
                        email: ${profile.email}
                     </li>
                     <li class="list-group-item">
                        address: ${profile.address.street}
                        address: ${profile.address.city}
                        address: ${profile.address.zipcode}
                        address: ${profile.address.suite}
                     </li>
                     <li class="list-group-item">
                      phone: ${profile.phone}
                     </li>
                     <li class="list-group-item">
                      website: ${profile.website}
                     </li>
                     <li class="list-group-item">
                      company: ${profile.company.name}
                     </li>
                 </ul>

           </div>
       </div>
   </div>
       
       `
   }
   showTodo(todo){
       let html="";
       todo.map((value,number)=>{
           if (value.completed) {
               html+=
               `
               <li class="list-group bg-success">
               ${value.title}
               </li>
                 `
           }
           else{`
            <li class="list-group bg-secondary">
            ${value.title}
            </li>
            `
           }
       })
       this.todoList.innerHTML=html;
   }
    showAlert(text)
    {
        this.alert.innerHTML=
        `
          ${text} is not found.       
        `
        this.profileContainer.innerHTML="";
    }
    showAlertTodo()
    {
        var nodes=this.todoList.childNodes
        console.log(nodes);
        nodes.forEach(e=>{
            e.remove();
        })
        
    }
   
  }

/*****************************/
var profile=new ProfileClass();
var ui=new UI();
const searchProfile=document.getElementById("searchProfile");
searchProfile.addEventListener("keyup",(event)=>{

  let text=  event.target.value;
  if (text!=null) {
      profile.getProfile(text)
      .then(res=>{
          
          if (res.profile.length!=0) {
             ui.showProfile(res.profile[0]);
             ui.showTodo(res.todo)
             
          }
          else
           ui.showAlert();
          
      })
      .catch(err=>{
          ui.showAlertTodo();
          ui.showAlert();
          console.log(err)
      })
  }
})