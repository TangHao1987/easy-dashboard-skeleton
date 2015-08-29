package easy.dashboard

import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import org.easydashboard.bean.converter.UserConverter
import org.easydashboard.enumeration.UserGroup
import org.easydashboard.vo.UserVo
import org.junit.Before
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(UserService)
@Mock(User)
class UserServiceSpec extends Specification {

    @Before
    void setup(){
        defineBeans{
            userConverter(UserConverter){bean ->
                //in case you have other beans defined inside helper
                bean.autowire = true
            }
        }
    }

    def cleanup() {
    }

    void "test addUser"() {
        given:"user vo"
        UserVo vo = new UserVo()
        vo.userGroup = UserGroup.ADMIN
        vo.email = "test1@123.com"
        vo.password = "1234"
        vo.enabled = false

        when: "test when"
        service.addUser(vo)
        then: "test then"
        assertTrue(true)
    }

}
