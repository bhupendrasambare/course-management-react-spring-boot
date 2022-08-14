package com.restapi.playload.defaultApiResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {
    public HttpStatus status;
    public String message;
    public T data;
}
