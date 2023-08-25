const forgotPasswordButton = document.getElementById('forgotPsk')
forgotPasswordButton.addEventListener('click', (e) => {
    e.preventDefault()
    window.location.href = './forgotPassword.html'
})

const signUp = document.getElementById('signUp')
signUp.addEventListener('click', () => {
    window.location.href = './signUp.html'
})



async function validateUser(e) {
    e.preventDefault()
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




