package org.easydashboard.vo

import org.easydashboard.enumeration.UserGroup
import org.easydashboard.framework.IVo

/**
 * Created by Hao on 29/8/2015.
 */
class UserVo implements IVo{
    String email
    String password
    UserGroup userGroup
    boolean enabled
}
