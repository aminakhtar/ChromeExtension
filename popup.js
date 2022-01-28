document.addEventListener('DOMContentLoaded', function(event) {
    GetActivity()
  })

  
const shareData = {
    title: 'Activity Finder',
    text: ''
}

const invite = 'Hi my friend, I am going to do this activity: . Would you like to join me?';
const btnShare = document.getElementById('btnfriendinvite');
const btnactivity = document.getElementById('btnactivity');

function GetActivity(){

    //btnShare.disabled = true;
    btnShare.style.display = 'none';
    btnactivity.style.display = 'none';

    showLoader();
    var link = "https://www.boredapi.com/api/activity"
    var x = new XMLHttpRequest();
    x.open('GET', link);
    x.onload = function() {
        const obj = JSON.parse(x.responseText);
        const div = document.querySelector('#resultDiv')  
        div.innerHTML = obj.activity;

        var a = invite;
        var b = div.innerHTML;
        var position = 46;
        var output = [a.slice(0, position), b, a.slice(position)].join('');
        shareData.text = output;

        hideLoader();

        //btnShare.disabled = false;
        btnShare.style.display = 'inline-block';
        btnactivity.style.display = 'inline-block';
    };
    x.send();
}

document.getElementById('btnactivity').addEventListener("click", handleButtonClick);
function handleButtonClick()
{
    GetActivity();
}
function GetActivityOffline()
{
    const div = document.querySelector('#resultDiv')  
    div.innerHTML = "TEST";
}
function showLoader() {
    document.getElementById("loader").style.display = "block";
    document.getElementById("resultDiv").style.display = "none";
}
function hideLoader() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("resultDiv").style.display = "block";
}

// Share must be triggered by "user activation"
btnShare.addEventListener('click', async () => {
    try {
        await navigator.share(shareData)
        //resultPara.textContent = 'The activity shared successfully!'
    } catch(err) {
    }
});
