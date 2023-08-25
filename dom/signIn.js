const signInButton = document.getElementById('signIn')
signIn.addEventListener('submit', validateUser)

async function validateUser() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const validate = {
        email: email,
        password: password
    }
    try {
        const result = await axios.post('http://localhost:3000/users/signIn', validate)
        const message = document.getElementById('Message')
        if (result.data.success) {
            message.innerHTML = result.data.message
            message.style.color = 'green'
            localStorage.setItem('token', result.data.token)
            setTimeout(() => {
                window.location.href = "./index.html"
            }, 1000)
        } else if (
            !result.data.success && !result.data.user
        ) {
            message.innerHTML = result.data.message
        }else{
            message.innerHTML = result.data.message   
        }
    } catch (err) {
        console.log(err)
    }

}

async function forgotPassword(e) {
    window.location.href = './forgotPassword.html'
}

