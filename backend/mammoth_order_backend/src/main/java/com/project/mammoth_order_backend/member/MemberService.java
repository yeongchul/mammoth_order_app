package com.project.mammoth_order_backend.member;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public void join(JoinDto joinDto) {
        if (memberRepository.findByUid(joinDto.getUid()).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        MemberEntity member = MemberEntity.builder()
                .uid(joinDto.getUid())
                .password(joinDto.getPassword())
                .name(joinDto.getName())
                .point(0)
                .build();

        memberRepository.save(member);
    }

    public boolean login(LoginDto loginDto) {
        Optional<MemberEntity> findMember = memberRepository.findByUid(loginDto.getUid());
        if (findMember.isPresent() && findMember.get().getPassword().equals(loginDto.getPassword())) {
            return true;
        } else {
            return false;
        }
    }
}
