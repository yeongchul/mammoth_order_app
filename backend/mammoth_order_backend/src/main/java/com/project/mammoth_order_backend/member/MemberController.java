package com.project.mammoth_order_backend.member;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/member")
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody JoinDto joinDto) {
        memberService.join(joinDto);
        return ResponseEntity.ok("회원가입 성공");
    }
}
