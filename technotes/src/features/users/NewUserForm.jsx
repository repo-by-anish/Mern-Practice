import { useNavigate } from "react-router-dom"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useEffect, useState } from "react"
import { ROLES } from "../../config/roles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-solid-svg-icons"
import useTitle from "../../hooks/useTitle"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const NewUserForm = () => {
  useTitle("new user")
  const [addNewUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(["Employee"]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])
  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    if (isSuccess) {
      setUsername("")
      setPassword("")
      setRoles([])
      navigate('/dash/users')
    }
  }, [isSuccess, navigate])

  const onUserNameChange = e => setUsername(e.target.value)
  const onPasswordChange = e => setPassword(e.target.value)

  const onRolesChange = e => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    )
    setRoles(value);
  }

  const canSave = [roles.length, validPassword, validUsername].every(Boolean) && !isLoading;

  const onSaveButtonClicked = async e => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles })
    }
  }

  const options = Object.values(ROLES).map(role => {
    return (
      <option key={role} value={role}>{role}</option>
    )
  })

  const errClass = isError ? "errmsg" : "offscreen"
  const validUserClass = !validUsername&&username ? "form__input--incomplete" : ""
  const validPwdClass = !validPassword&&password ? "form__input--incomplete" : ""
  const validRolesClass = !Boolean(roles.length) ? "form__input--incomplete" : ""

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveButtonClicked} >
        <div className="form__title-row">
          <h2>New User</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span></label>
        <input
          className={`form__input ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onUserNameChange}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChange}
        />

        <label className="form__label" htmlFor="roles">
          ASSIGNED ROLES:</label>
        <select
          id="roles"
          name="roles"
          className={`form__select ${validRolesClass}`}
          multiple={true}
          size="3"
          value={roles}
          onChange={onRolesChange}
        >
          {options}
        </select>
      </form>
    </>
  )


  return content
}

export default NewUserForm