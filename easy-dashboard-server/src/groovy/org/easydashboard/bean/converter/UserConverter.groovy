package org.easydashboard.bean.converter

import easy.dashboard.User
import org.easydashboard.framework.IConverter
import org.easydashboard.vo.UserVo
import org.springframework.stereotype.Component

/**
 * Created by Hao on 29/8/2015.
 */
@Component
class UserConverter implements IConverter<User, UserVo>{

    @Override
    User toDomainObject(UserVo userVo) {
        User user = new User()
        user.email = userVo.email
        updateDomainObject(user, userVo)
        return user
    }

    @Override
    void updateDomainObject(User user, UserVo userVo) {
        user.userGroup = userVo.userGroup
        user.password = userVo.password
        user.enable = userVo.enabled
    }

    @Override
    UserVo toValueObject(User user) {
        UserVo vo = new UserVo()
        vo.userGroup = user.userGroup
        vo.email = user.email
        vo.password = user.password
        vo.enabled = vo.enabled
        return vo
    }
}
