document.addEventListener("DOMContentLoaded", () => {
    // 1. Scroll Reveal Animation
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); 
            }
        });
    }, { root: null, threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.getBoundingClientRect().top + window.pageYOffset - 80,
                    behavior: "smooth"
                });
            }
        });
    });

    // 3. Project Data (상세 보기 내용)
    const projectData = {
        project1: {
            title: "Digital Twin 생산공장 모니터링",
            role: "Unity Client Developer",
            overview: "LG Energy Solution 배터리 공장의 FMCS Layout3D 구축 및 확산 프로젝트에서 백엔드 API와 실시간 스트리밍 데이터를 연동한 모니터링 시스템입니다.",
            tech: "Unity, REST API, Streaming Data, PC",
            features: [
                "실시간 생산 데이터 연동 및 실적 대시보드 표시",
                "설비 상태, 알람 아이콘, 제품 목적지 표시 기능 구현",
                "공정·물류 설비 3D 배치 및 ID 매핑"
            ],
            challenge: "무한 로딩, 멈춤 현상 등 데이터 병목으로 인한 퍼포먼스 저하 발생.",
            solution: "MVVM 패턴을 학습하여 적용하고, 배칭(Batching) 최소화 등 렌더링 성능 최적화를 진행하여 안정적인 실시간 모니터링 환경 구축."
        },
        project2: {
            title: "Arcana (모바일 컨트롤러 PC 연동 게임)",
            role: "Developer / Sub Planner",
            overview: "고가의 장비 없이 스마트폰을 컨트롤러로 활용해 PC 캐릭터를 조작하는 감성 어드벤처 게임입니다.",
            tech: "Unity, Photon Engine, PC, Android",
            features: [
                "Photon 기반 PC-Android 1:1 통신 구조 구현",
                "모바일 컨트롤러 입력 데이터를 PC 클라이언트로 실시간 전달",
                "Character Controller 기반 이동 및 Camera Moving 직접 구현"
            ],
            challenge: "오프라인 전시 환경 특성상 와이파이 간섭으로 인한 네트워크 연결 끊김 문제가 빈번히 발생.",
            solution: "연결 끊김을 감지하는 예외 상황 처리 로직을 설계하여 전시 중 안정성을 대폭 개선."
        },
        project3: {
            title: "메타버스 안드로이드 애플리케이션",
            role: "Unity Client Team Intern",
            overview: "ICT 학점연계 프로젝트 인턴십을 통해 개발한 메타버스 앱으로, 실무 환경에서 협업 프로세스를 경험한 프로젝트입니다.",
            tech: "Unity, Android, REST API",
            features: [
                "AI 모션캡처 R&D 및 모션 데이터 기반 애니메이션 동기화",
                "기획 문서 기반 UI/UX 구현",
                "서버 팀과 통신하며 REST API 연동 및 데이터 파싱 처리"
            ],
            challenge: "기획·아트·서버 팀 등 다부서 간의 소통 및 문서화된 규격에 맞춘 개발 경험 부재.",
            solution: "명세서를 바탕으로 구조를 짜고, 실무진 코드 리뷰를 통해 유지보수성 높은 코드 작성법을 습득함."
        },
        project4: {
            title: "AR 기반 스마트 헬스케어",
            role: "Content / Technical Developer",
            overview: "GSC LAB 학부연구생 프로젝트로, 스마트 미러를 활용하여 사용자의 운동 동작을 인식하고 피드백하는 콘텐츠입니다.",
            tech: "Unity, Computer Vision (OpenCV)",
            features: [
                "콘텐츠 전체 Flow, 동영상 플레이어, 타이머 시스템 구현",
                "RGB 카메라 기반 손 제스처 및 팔 제스처 인식 연구",
                "사용자 동작 유도 방식 설계 및 피드백 로직 구현"
            ],
            challenge: "Unity 클라이언트와 Computer Vision 기술을 자연스럽게 연결하는 로직 설계의 어려움.",
            solution: "영상처리 알고리즘(프레임 차 계산 등) 결과를 Unity 데이터로 파싱하여 실시간 인터랙션 요소로 시각화함."
        }
    };

    // 4. Modal Logic
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.modal-close');
    const backdrop = document.querySelector('.modal-backdrop');

    // 열기 로직
    document.querySelectorAll('.modal-trigger').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const data = projectData[id];
            
            if(data) {
                // 모달 내용 렌더링
                modalBody.innerHTML = `
                    <h2>${data.title}</h2>
                    <div class="role">${data.role}</div>
                    
                    <div class="modal-section">
                        <h4>Overview</h4>
                        <p>${data.overview}</p>
                    </div>
                    
                    <div class="modal-section">
                        <h4>Tech Stack</h4>
                        <p>${data.tech}</p>
                    </div>
                    
                    <div class="modal-section">
                        <h4>Key Features</h4>
                        <ul>
                            ${data.features.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="modal-section">
                        <h4>Challenge & Solution</h4>
                        <p><strong>문제:</strong> ${data.challenge}</p>
                        <p><strong>해결:</strong> ${data.solution}</p>
                    </div>
                `;
                
                modal.classList.add('active');
                document.body.classList.add('modal-open'); // 스크롤 방지
            }
        });
    });

    // 닫기 로직 함수
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    };

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    // ESC 키로 닫기
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});