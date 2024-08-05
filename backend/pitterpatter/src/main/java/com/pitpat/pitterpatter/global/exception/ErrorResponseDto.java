package com.pitpat.pitterpatter.global.exception;


public class ErrorResponseDto {
    private String msg;

    public String getMsg() {
        return msg;
    }

    public ErrorResponseDto(String msg) {
        this.msg = msg;
    }
}
