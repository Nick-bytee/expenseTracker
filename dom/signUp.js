const signUp = document.getElementById('signUp')
document.addEventListener('submit', addUser)

const signIn = document.getElementById('signIn')
signIn.addEventListener('click', () => {
    window.location.href = './signIn.html'
})


async function addUser(e) {
    e.preventDefault()

    if (signUp.innerHTML === "Sign In") {
        return validateUser()
    }

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const myObj = {
        name: name,
        email: email,
        password: password
    }

    try {
        const result = await axios.post('http://localhost:3000/users/Adduser', myObj)
        const message = document.getElementById('Message')
        message.innerHTML = result.data.message
        message.style.color = 'green'
        setTimeout(() => {
            window.location.href = "./signIn.html"
        }, 1000)
    } catch (err) {
        if (err.response && err.response.status === 400) {
            document.getElementById('Message').innerHTML = err.data.message
        }
    }

}