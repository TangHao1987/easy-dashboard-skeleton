package org.easydashboard.vo

import org.easydashboard.enumeration.ResponseEnum

/**
 * Created by Hao on 30/8/2015.
 */
class UserResponseVo extends AbstractResponseVo{
    UserResponseVo(ResponseEnum resp) {
        super(resp)
    }

    List<UserVo> userVos
}
