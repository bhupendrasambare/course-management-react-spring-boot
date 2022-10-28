package com.restapi.playload.response;

import com.restapi.playload.defaultApiResponse.StringLong;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAccountResponse {
    String first;
    String last;
    String email;
    String Username;
    String phone;
    List<StringLong> courses;
}
