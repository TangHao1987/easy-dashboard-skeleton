package easy.dashboard

import grails.converters.JSON
import org.easydashboard.enumeration.ResponseEnum
import org.easydashboard.vo.AbstractResponseVo
import org.easydashboard.vo.BinaryResponseVo
import org.easydashboard.vo.UserResponseVo
import org.easydashboard.vo.UserVo

class UserController {
    UserService userService

    def createOrUpdateUser(){
        UserVo userVo = new UserVo()
        bindData(userVo, params)
        BinaryResponseVo vo = new BinaryResponseVo(userService.createOrUpdateUser(userVo))
        render(vo as JSON)
    }

    def getAllUsers(){
        List<UserVo> users = userService.getAllUsers()
        UserResponseVo vo = new UserResponseVo(ResponseEnum.OK)
        vo.userVos = users
        render(vo as JSON)
    }

    def authenticate(){
        UserVo userVo = new UserVo()
        bindData(userVo, params)
        ResponseEnum resp = userService.authenticateUser(userVo);
        BinaryResponseVo vo = new BinaryResponseVo(resp)
        render(vo as JSON)
    }

    def getUserByEmail(){
        String email = params.email
        UserVo vo = userService.getUser(email)
        ResponseEnum resp
        AbstractResponseVo respVo
        if(!vo){
            resp = ResponseEnum.VF_NULL_IMPORTANT_FIELD
            respVo = new BinaryResponseVo(resp)
        }else{
            resp = ResponseEnum.OK
            List<UserVo> voList = []
            voList.add(vo)
            respVo = new UserResponseVo(resp)
        }
        render(respVo as JSON)
    }
}
