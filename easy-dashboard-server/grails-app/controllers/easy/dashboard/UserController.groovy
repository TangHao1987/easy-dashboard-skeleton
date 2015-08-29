package easy.dashboard

import org.easydashboard.vo.UserVo

class UserController {
    UserService userService

    def addUser(){
        UserVo userVo = new UserVo()
        bindData(userVo, params)
        userService.addUser(userVo)
        render("success")
    }
}
