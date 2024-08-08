import { userApi } from "/src/apiService.js";
import { hostApi } from "../../apiService.js";

// =================== 회원가입 관련 ========================
// 일반 유저 회원가입
export const signUp = async (data) => {
  console.error(data.email, data.password);
  const response = await userApi.post("/email", data);
  return response;
};

// 이메일 중복 체크
export const checkDuplicateEmail = async (email) => {
  const response = await userApi.get("/check/email", {
    params: { 
      email: email,
    },
  });
  return response;
};

// 팀 이름 중복 체크
export const checkDuplicateTeamName = async (teamName) => {
  const response = await userApi.get("/check/teamname", {
    params: { 
      teamname: teamName,
    },
  });
  return response;
}

// ================== 로그인 관련 ==========================
// 일반 회원 로그인
export const login = async (data) => {
  const response = await userApi.post("/login/email", data);
  return response;
};

// 카카오 회원 로그인
export const kakaoLogin = async () => {
  const response = await hostApi.get("/oauth2/authorization/kakao");
  return response;
}

// 비밀번호 검증
export const verifyPassword = async (jwtToken, password) => {
  const response = await userApi.post("/verify/password", {
    "password": password,
  }, {
    headers: {
      "Authorization": `Bearer ${jwtToken}`
    }
  });
  return response;
}


// ====================== 조회, 변경, 탈퇴 관련 =====================
// 회원 정보 조회
export const getUser = async (jwtToken) => {
  const response = await userApi.get("", {
    headers: {
      "Authorization": `Bearer ${jwtToken}`
    },
  });
  return response;
}

// 회원 정보 변경(2차 비밀번호, 팀 이름)
export const updateUser = async (jwtToken, data) => {
  const response = await userApi.patch("",
    data, {
    headers: {
      "Authorization": `Bearer ${jwtToken}`,
    }
  });
  return response;
}

// 회원 탈퇴
export const deleteUser = async (jwtToken) => {
  const response = await userApi.delete("", {
    headers: {
      "Authorization": `Bearer ${jwtToken}`,
    }
  });
  return response;
}

// ===================== 비밀번호 재설정 관련 ==================
// 비밀번호 재설정(userId로)
export const resetPasswordByUserId = async (jwtToken, password) => {
  const response = await userApi.patch("/password/reset/id", {
    "password": password
  }, {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  });  
  return response;
}

// 비밀번호 재설정(이메일 토큰으로)
export const resetPasswordByEmailToken = async (email, emailToken, password) => {
  const response = await userApi.patch("/password/reset/token", {
    "passwordDto": {
        "password": password,
    },
    "emailTokenVerifyDto": {
        "email": email,
        "emailToken": emailToken,
    }
  });
  return response;
}

// 비밀번호 재설정 이메일 토큰 검증
export const verifyEmailToken = async (email, emailToken) => {
  const response = await userApi.post("/verify/password/reset_token", {
    "email": email,
    "emailToken": emailToken,
  });
  return response;
}

// 비밀번호 재설정 이메일 발송
export const sendResetPasswordEmail = async (email) => {
  const response = await userApi.post("/password/reset_token", {
    "email": email
  });
  return response;
}

// 2차 비밀번호 재설정(이메일 토큰으로)
export const reset2faByEmailToken = async (email, emailToken, twoFa) => {
  const response = await userApi.patch("/2fa/reset/token", {
    "twoFaDto": {
        "twoFa": twoFa
    },
    "emailTokenVerifyDto": {
        "email": email,
        "emailToken": emailToken
    }
  });
  return response;
}

// 2차 비밀번호 재설정 이메일 토큰 검증
export const verifyEmailTokenForReset2fa = async (email, emailToken) => {
  const response = await userApi.post("/verify/2fa/reset_token", {
    "email": email,
    "emailToken": emailToken,
  });
  return response;
}

// 2차 비밀번호 재설정 이메일 발송
export const sendReset2faEmail = async (email) => {
  const response = await userApi.post("/2fa/reset_token", {
    "email": email
  });
  return response;
}

// ========================== 기타 ===============================
// 2차 비밀번호 검증
export const verify2fa = async (jwtToken, twoFa) => {
  const response = await userApi.post("/verify/2fa", {
    "twoFa": twoFa
  }, {
    headers: {
      "Authorization": `Bearer ${jwtToken}`,
    }
  })
  return response;
}

// 토큰 재발급
export const reissueJwtToken = async (jwtRefreshToken) => {
  const response = await userApi.patch("/reissue", {},
    {
    headers: {
      "Authorization": `Bearer ${jwtRefreshToken}`,
    }
  });
  return response;
}