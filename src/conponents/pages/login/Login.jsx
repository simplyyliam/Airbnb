import { Wrapper } from "../../shared";
import "./Login.css"


export default function LoginPage() {
    return (
        <Wrapper className="login-container">
            <form onSubmit={""}> 
                <h1>Login</h1>
                <div className="input-field">
                    <p>Username</p>
                    <input type="text"/>
                </div>
                <div className="input-field">
                    <p>Password</p>
                    <input type="text"/>
                </div>
                <p>Forgot Password?</p>
                <button>Login</button>
            </form>
        </Wrapper>
    )
}