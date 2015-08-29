package org.easydashboard.enumeration

/**
 * Created by Hao on 29/8/2015.
 */
enum ResponseEnum {
    OK(0, "SUCCESS"),
    VF(100, "VALIDATION FAILED"),
    VF_NULL_IMPORTANT_FIELD(101, "VALIDATION FAILED DUE TO NULL IMPORTANT FIELD"),
    WRONG_PASSWORD(200, "WRONG PASSWORD")

    int id
    String message
    private ResponseEnum(int id, String message){
        this.id = id
        this.message = message
    }
}