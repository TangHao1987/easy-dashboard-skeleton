package org.easydashboard.vo

import org.easydashboard.enumeration.UserGroup
import org.easydashboard.framework.IVo
import org.grails.databinding.BindUsing

/**
 * Created by Hao on 29/8/2015.
 */
class UserVo implements IVo{
    String email
    String password

    @BindUsing({obj, source ->
        int id = (source['userGroup'] as String)?.toInteger()
        UserGroup.getEnumFromId(id);
    })
    UserGroup userGroup
    boolean enabled
}
