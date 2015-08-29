package org.easydashboard.framework

import org.easydashboard.enumeration.ResponseEnum

import javax.xml.ws.Response

/**
 * Created by Hao on 29/8/2015.
 */
interface IValidator<VO extends  IVo> {
    ResponseEnum validate(VO vo)
}