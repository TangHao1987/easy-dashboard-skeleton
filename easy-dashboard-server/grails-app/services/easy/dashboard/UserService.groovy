package easy.dashboard

import grails.transaction.Transactional
import org.easydashboard.bean.converter.UserConverter
import org.easydashboard.vo.UserVo

@Transactional
class UserService {

    UserConverter userConverter

    void addUser(UserVo vo){
        User user = userConverter.toDomainObject(vo)
        user.save()
    }

    UserVo getUser(String email){
        User user= User.findByEmail(email)
        userConverter.toValueObject(user)
    }
}
