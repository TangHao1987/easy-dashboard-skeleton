package easy.dashboard

import org.easydashboard.enumeration.UserGroup
import org.easydashboard.framework.IDomain

class User implements IDomain{
    String email
    String password
    UserGroup userGroup
    boolean enable

    static mapping = {
        version false
        id generator: 'assigned', name: 'email', type: 'string'
    }
    static constraints = {
        email(nullable: false, unique: true)
        password(nullable: false)
        userGroup(nullable: false)
    }
}
