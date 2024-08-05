package com.pitpat.pitterpatter.global.util.user;

import com.pitpat.pitterpatter.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class TeamNameGenerator {

    // 관형사 목록
    private static final List<String> ADJECTIVES = Arrays.asList(
            "빠른", "강력한", "영리한", "미래의", "정확한", "용감한", "창조적인", "지혜로운", "활기찬", "전략적인",
            "강한", "기술적인", "신속한", "재능 있는", "독창적인", "결단력 있는", "혁신적인", "창의적인", "자유로운", "준비된",
            "민첩한", "집중된", "효율적인", "헌신적인", "믿음직한", "유능한", "열정적인", "대담한", "세련된", "근면한",
            "귀여운", "강한", "용기 있는", "우수한", "완벽한", "적극적인", "위대한", "신속한", "정통한", "뛰어난"
    );

    // 동물 목록
    private static final List<String> ANIMALS = Arrays.asList(
            "호랑이", "사자", "독수리", "늑대", "곰", "상어", "코끼리", "스네이크", "치타", "타이거",
            "사슴", "펭귄", "여우", "고양이", "강아지", "다람쥐", "올빼미", "타조", "미어캣", "하마",
            "캥거루", "거북이", "코뿔소", "조랑말", "늑대", "이구아나", "살쾡이", "고릴라", "얼룩말", "표범",
            "오랑우탄", "피라냐", "바다사자", "두더지", "도마뱀", "아르마딜로", "새끼곰", "넙치", "멧돼지", "우사",
            "개미핥기", "알파카", "로어", "해달", "달팽이", "지렁이", "뱀", "새", "비둘기", "거미"
    );

    private static final Random RANDOM = new Random();
    private static final int MAX_NUMBER = 999;  // 숫자의 최대 값

    // 팀 이름 생성기
    public static String generateTeamName() {
        String adjective = getRandomElement(ADJECTIVES);
        String animal = getRandomElement(ANIMALS);
        int number = RANDOM.nextInt(MAX_NUMBER + 1);  // 0에서 MAX_NUMBER까지의 랜덤 숫자 생성
        return adjective + " " + animal + "#" + number;
    }

    // 리스트에서 랜덤 요소 선택
    private static <T> T getRandomElement(List<T> list) {
        int index = RANDOM.nextInt(list.size());
        return list.get(index);
    }
}
