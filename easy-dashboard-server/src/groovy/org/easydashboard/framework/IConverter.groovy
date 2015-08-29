package org.easydashboard.framework

/**
 * Created by Hao on 29/8/2015.
 */
interface IConverter<DO extends IDomain, VO extends IVo> {
    DO toDomainObject(VO valueObject)
    VO toValueObject(DO DomainObject)
}