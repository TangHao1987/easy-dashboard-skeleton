package easy.dashboard

import grails.transaction.Transactional
import org.easydashboard.bean.converter.UserConverter
import org.easydashboard.enumeration.ResponseEnum
import org.easydashboard.framework.IValidator
import org.easydashboard.vo.UserVo

@Transactional
class UserService implements IValidator<UserVo>{

    UserConverter userConverter

    ResponseEnum createOrUpdateUser(UserVo vo){
        ResponseEnum resp = validate(vo)
        if(resp != ResponseEnum.OK){
            return resp
        }
        User user = User.findByEmail(vo?.email)
        if(user){
            userConverter.updateDomainObject(user,vo)
        }else{
            user = userConverter.toDomainObject(vo)
        }
        user.save(failOnError: true)
        return resp
    }

    UserVo getUser(String email){
        User user= User.findByEmail(email)
        if(!user){
            return null
        }else{
            return userConverter.toValueObject(user)
        }
    }

    ResponseEnum authenticateUser(UserVo vo){
        ResponseEnum resp = validate(vo)
        if(resp!= ResponseEnum.OK){
            return resp
        }

        User user= User.findByEmail(vo.getEmail())
        if(user.password != vo.password){
            resp = ResponseEnum.WRONG_PASSWORD
        }
        return resp
    }

    List<UserVo> getAllUsers(){
        List<User> users = User.findAll()
        users.collect {
            userConverter.toValueObject(it)
        }
    }

    @Override
    ResponseEnum validate(UserVo vo) {
        if(!vo.email || !vo.password || !vo.userGroup){
            return ResponseEnum.VF_NULL_IMPORTANT_FIELD
        }
        return ResponseEnum.OK
    }
}
