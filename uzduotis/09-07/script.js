
const fetchRandomUser = () => {
fetch('https://randomuser.me/api/')
  .then(res => res.json())
  .then(data => {
    user = data.results[0];
    document.getElementById("picture").src = user.picture.large;
    document.getElementById("userTitle").textContent = `Hi, My name is`
    document.getElementById("user_value").textContent = `${user.name.title} ${user.name.first} ${user.name.last}`
   
  });
}
fetchRandomUser()

const updateInfo = (title, value) => {
  document.getElementById("userTitle").textContent = title;
  document.getElementById("user_value").textContent = value;
}; 

const nameInfo = () => updateInfo("Hi, My name is", `${user.name.first} ${user.name.last}`);
const emailInfo = () => updateInfo("My email address is", user.email);
const dateInfo = () => updateInfo("My birthday is", user.dob.date.slice(0, 10));
const mapInfo = () => updateInfo("My address is", `${user.location.street.number} ${user.location.street.name}`);
const phoneInfo = () => updateInfo("My phone number is", user.cell);
const passInfo = () => updateInfo("My password is", user.login.password);

openNew = () => document.getElementById('new').style.display = 'block'
closeNew = () =>document.getElementById('new').style.display = 'none'
  