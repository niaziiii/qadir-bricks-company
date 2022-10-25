import cookie from 'react-cookies'
import { getItems } from './helper';

const checkUserLogedIn = async ({ setAuthUser }) => {
    const cookies = cookie.loadAll()
    console.log('in user logged in fun');
    console.log(cookies);
    if (!cookies.jwt) return setAuthUser(false)

    try {
        const user = await getItems('https://qadir-bricks-company.herokuapp.com/api/v1/admin/loggedin')
        if (user.data.status === "success") {
            setAuthUser(true)
        } else {
            cookie.remove('jwt')
            setAuthUser(false)
        }
    } catch (error) {
        cookie.remove('jwt')
        setAuthUser(false)
    }


}

export {
    checkUserLogedIn
}