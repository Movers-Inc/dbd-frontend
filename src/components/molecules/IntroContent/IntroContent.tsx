import React, { FC } from "react";

interface IntroContentProps {
  page: number;
}

const IntroContent: FC<IntroContentProps> = ({ page }) => {
  const renderContent = () => {
    switch (page) {
      case 1:
        return (
          <div className="mt-4">
            <video
              src="/video/page1.mp4"
              autoPlay
              muted
              loop
              className="w-full h-auto"
            />
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col items-start justify-start">
            <p className="text-lg text-gray-600 mb-4">
              수백 편의 논문 분석을 통해 밝혀진 진실입니다.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800 font-medium">
                식단 기록의 힘: 단순하지만 강력한 다이어트 도구
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col items-start justify-start">
            <p className="text-lg text-gray-600 mb-4">
              매일 기록하는 것만으로도 이런 효과를 볼 수 있습니다.
            </p>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-blue-600">400%</div>
              <div className="text-gray-600">
                <p>감량 효과 증가</p>
                <p className="text-sm">일반 다이어트 대비</p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col items-start justify-start">
            <p className="text-lg text-gray-600 mb-4">
              왜 식단 기록이 효과적일까요?
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">무의식적 섭취를 의식화</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">충동적 식사 패턴 차단</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">자기 관찰력 향상</span>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col items-start justify-start">
            <p className="text-lg text-gray-600 mb-4">
              하지만 현실은 쉽지 않습니다.
            </p>
            <div className="bg-red-50 p-4 rounded-lg mb-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-red-600">93%</span>
                <span className="text-red-800">가 한 달 내 포기</span>
              </div>
            </div>
            <p className="text-gray-600">
              의지만으로는 지속하기 어려운 것이 현실입니다.
            </p>
          </div>
        );

      case 6:
        return (
          <div className="flex flex-col items-start justify-start">
            <p className="text-lg text-gray-600 mb-4">
              그래서 AI 코치가 필요합니다.
            </p>
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-blue-800">📞 기록 리마인더 전화</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-blue-800">💪 동기부여 메시지</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-blue-800">📊 진행상황 피드백</p>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="flex flex-col items-start justify-start">
            <p className="text-lg text-gray-600 mb-4">
              AI는 절대 포기하지 않습니다.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700">24시간 언제든 지원</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700">개인 맞춤 코칭</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700">감정적 판단 없음</span>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="flex flex-col items-start justify-start">
            <p className="text-lg text-gray-600 mb-4">
              끈질기게, 꾸준히, 성공할 때까지
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
              <p className="text-blue-800 font-medium">
                "매일 귀찮게 해드리는 것이 저희의 임무입니다"
              </p>
              <p className="text-blue-600 text-sm mt-2">- AI 다이어트 코치</p>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="flex flex-col items-start justify-start">
            <p className="text-lg text-gray-600 mb-4">지금 바로 시작하세요!</p>
            <div className="bg-blue-600 text-white p-4 rounded-lg w-full text-center">
              <p className="text-xl font-semibold mb-2">360명과 함께</p>
              <p className="text-blue-100">검증된 다이어트 여정을 시작하세요</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-start justify-start">
            <p className="text-gray-500">콘텐츠를 불러올 수 없습니다.</p>
          </div>
        );
    }
  };

  return <div className="w-full">{renderContent()}</div>;
};

export default IntroContent;
