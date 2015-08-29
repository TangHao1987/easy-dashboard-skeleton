package org.easydashboard.vo

import org.easydashboard.enumeration.ResponseEnum

/**
 * Created by Hao on 29/8/2015.
 *
 */
abstract class AbstractResponseVo implements Serializable{
    AbstractResponseVo(ResponseEnum resp){
        this.id = resp.id
        this.errorMsg = resp.message
    }

    int id
    String errorMsg
}
