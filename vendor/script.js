const form = document.querySelector("form"),
statusTxt = form.querySelector(".button-area span");

form.onsubmit = (e)=>{
  e.preventDefault();
  statusTxt.style.color = "#0D6EFD";
  statusTxt.style.display = "block";
  statusTxt.innerText = "Sending your message...!!";
  form.classList.add("disabled");

  let xhr = new XMLHttpRequest();
 // console.log("Test Message 123");
  xhr.open("GET", "../php/message.php", true);
  
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //console.log("Test Message 345");
  
  xhr.onload = ()=>{
    //alert(xhr.responseText);
    //console.log("Test Message 23432423");
    if(xhr.readyState == 4 && xhr.status == 200){
      //console.log("Test Message");
      let response = xhr.response;
      if(response.indexOf("required") != -1 || response.indexOf("valid") != -1 || response.indexOf("failed") != -1){
        statusTxt.style.color = "red";
      }else{
        form.reset();
        setTimeout(()=>{
          statusTxt.style.display = "none";
        }, 3000);
      }
      statusTxt.innerText = response;
      form.classList.remove("disabled");
    }
  }
  //console.log(form);
  let formData = new FormData(form);

  xhr.send(formData);
  
}