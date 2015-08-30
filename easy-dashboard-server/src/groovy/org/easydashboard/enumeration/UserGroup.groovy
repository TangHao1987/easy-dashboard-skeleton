package org.easydashboard.enumeration

import org.easydashboard.framework.IIdName

/**
 * Created by Hao on 29/8/2015.
 */
enum UserGroup implements IIdName{
    ADMIN(1,'Admin'),
    MEMBER(2,'Member')

    int id
    String name
    private UserGroup(int id, String name){
        this.id = id
        this.name = name
    }

    public static IIdName getEnumFromId(int id){
        values().find{
            it.id == id
        }
    }
}