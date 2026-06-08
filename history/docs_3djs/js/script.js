import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';

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
        },
        project5: {
            title: "스마트 미러 AR 헬스케어",
            role: "XR Content Developer",
            overview: "스마트 미러 기반 AR 헬스케어 콘텐츠로, 사용자 운동을 인식하고 실시간 피드백을 제공하여 몰입형 운동 경험을 구성했습니다.",
            tech: "Unity, Computer Vision, Smart Mirror",
            features: [
                "운동 동작 감지 및 피드백 로직 구현",
                "사용자 맞춤형 운동 흐름 설계",
                "UI/UX 기반 콘텐츠 흐름과 동영상 재생 시스템 구축"
            ],
            challenge: "실시간 영상 처리 결과를 클라이언트에 안정적으로 전달하는 구조 설계가 필요했습니다.",
            solution: "데이터 파이프라인을 단순화하고 텐서플로우 및 OpenCV 결과를 Unity 요소로 안정적으로 매핑했습니다."
        },
        project6: {
            title: "조경 설계 프로그램",
            role: "Graphics Programming",
            overview: "C++/OpenGL 기반으로 마당에 오브젝트를 배치하면서 조경을 설계하는 인터랙티브 프로그램을 구현했습니다.",
            tech: "C++, OpenGL",
            features: [
                "3D 오브젝트 배치 및 회전 기능 구현",
                "사용자 입력 기반 인터랙션 설계",
                "그래픽스 프로그래밍 과제 요구사항을 충족하는 렌더링 구조 구성"
            ],
            challenge: "그래픽스 파이프라인과 사용자 인터페이스의 균형을 맞추는 것이 중요했습니다.",
            solution: "렌더링과 셀렉션 로직을 분리하여 유지보수성과 확장성을 확보했습니다."
        },
        project7: {
            title: "AR 제스쳐 그림판",
            role: "Computer Vision Developer",
            overview: "손 제스처를 이용해 색상을 바꾸며 그릴 수 있는 AR 그림판을 영상처리 기반으로 구현했습니다.",
            tech: "Python, OpenCV, AR",
            features: [
                "손 제스처 인식으로 브러시 색상 변경",
                "AR 상에서 실시간 드로잉 인터랙션 구현",
                "영상 처리 기반 입력 추적 로직 개발"
            ],
            challenge: "제스처의 안정적인 인식과 매끄러운 드로잉 경험을 동시에 구현하는 것이 과제였습니다.",
            solution: "프레임 간 차이를 활용해 움직임을 필터링하고 입력 신호를 부드럽게 처리했습니다."
        },
        project8: {
            title: "RAPA XR 단기 프로젝트 세트",
            role: "XR Content Developer",
            overview: "RAPA XR 콘텐츠 개발자 과정에서 VR/AR 단기 프로젝트 4종을 개발하며 XR 콘텐츠 제작 역량을 확장했습니다.",
            tech: "Unity, Oculus VR, PC Game",
            features: [
                "Tale Village VR 동화 체험 콘텐츠 개발",
                "Exodus VR 공포 게임 제작",
                "RunAway PC 레이싱 게임 및 DeepSleep 장애물 피하기 게임 구현"
            ],
            challenge: "짧은 기간 내에 다양한 XR 콘텐츠를 안정적으로 완성해야 했습니다.",
            solution: "프로젝트별 핵심 기능을 분리하고 반복 가능한 개발 패턴을 적용하여 일정을 관리했습니다."
        }
    };

    // 4. Modal Logic
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.modal-close');
    const backdrop = document.querySelector('.modal-backdrop');

    const openModalById = (id) => {
        const data = projectData[id];
        if (!data) return;

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
        document.body.classList.add('modal-open');
    };

    document.querySelectorAll('.modal-trigger').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            openModalById(button.getAttribute('data-id'));
        });
    });

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.modal-trigger')) return;
            openModalById(card.getAttribute('data-id'));
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

    // 5. Hero 3D Widget
    const initThreeHero = () => {
        const rootElement = document.getElementById('hero-app');
        if (!rootElement) return;

        const canvas = document.createElement('canvas');
        canvas.className = 'hero-canvas';
        canvas.setAttribute('aria-hidden', 'true');
        rootElement.appendChild(canvas);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, rootElement.clientWidth / rootElement.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 5.2);

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);

        const ambient = new THREE.HemisphereLight(0xf0f8ff, 0xc6d8f5, 0.95);
        const directional = new THREE.DirectionalLight(0xffffff, 1.1);
        directional.position.set(5, 6, 5);
        scene.add(ambient, directional);

        const material = new THREE.MeshPhysicalMaterial({
            color: 0xe9f1f8,
            metalness: 0.4,
            roughness: 0.15,
            clearcoat: 1,
            clearcoatRoughness: 0.05,
            transmission: 0.35,
            opacity: 0.92,
            transparent: true,
        });

        const geometry = new THREE.TorusKnotGeometry(0.95, 0.28, 140, 20);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const glow = new THREE.Mesh(
            new THREE.IcosahedronGeometry(0.58, 3),
            new THREE.MeshStandardMaterial({
                color: 0xc7e4ff,
                metalness: 0.82,
                roughness: 0.18,
                emissive: 0xbedcff,
                emissiveIntensity: 0.2,
                opacity: 0.8,
                transparent: true,
            })
        );
        scene.add(glow);

        const halo = new THREE.Mesh(
            new THREE.TorusGeometry(1.85, 0.05, 48, 160),
            new THREE.MeshStandardMaterial({
                color: 0xffffff,
                metalness: 0.95,
                roughness: 0.22,
                opacity: 0.24,
                transparent: true,
            })
        );
        halo.rotation.x = Math.PI / 2;
        halo.rotation.y = Math.PI / 4;
        scene.add(halo);

        const resize = () => {
            const width = rootElement.clientWidth;
            const height = rootElement.clientHeight;
            if (!width || !height) return;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        const onPointerMove = (event) => {
            const x = (event.clientX / window.innerWidth - 0.5) * 1.6;
            const y = (event.clientY / window.innerHeight - 0.5) * 1.2;
            mesh.rotation.x = y * 0.8;
            mesh.rotation.y = x * 1.4;
            glow.rotation.x = y * 0.9;
            glow.rotation.y = x * 1.6;
        };

        const animate = () => {
            mesh.rotation.x += 0.004;
            mesh.rotation.y += 0.005;
            halo.rotation.z += 0.0012;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('pointermove', onPointerMove);
        resize();
        animate();
    };

    // 6. Skill Cloud Widget
    const initSkillCloud = () => {
        const rootElement = document.getElementById('skill-cloud-root');
        if (!rootElement) return;

        const skills = [
            'Unity', 'Three.js', 'XR', 'OpenCV', 'C++', 'Photon', 'REST API', 'Android', 'Computer Vision', 'Shader', '3D UI', 'Smart Mirror', 'AR', 'VR', 'Interactive Design'
        ];

        const nodes = skills.map((label) => {
            const tag = document.createElement('div');
            tag.className = 'skill-tag';
            tag.textContent = label;
            tag.style.top = `${10 + Math.random() * 70}%`;
            tag.style.left = `${10 + Math.random() * 70}%`;
            tag.dataset.phase = String(Math.random() * Math.PI * 2);
            tag.dataset.speed = String(0.002 + Math.random() * 0.002);
            tag.dataset.offset = String(10 + Math.random() * 12);
            tag.dataset.base = String(0.95 + Math.random() * 0.2);
            tag.style.transform = `translate(-50%, -50%) scale(${tag.dataset.base})`;
            rootElement.appendChild(tag);
            return tag;
        });

        rootElement.addEventListener('pointermove', (event) => {
            const bounds = rootElement.getBoundingClientRect();
            const mx = (event.clientX - bounds.left) / bounds.width;
            const my = (event.clientY - bounds.top) / bounds.height;
            nodes.forEach((tag, index) => {
                const base = Number(tag.dataset.base) || 1;
                const offsetX = (mx - 0.5) * (5 + index * 0.3);
                const offsetY = (my - 0.5) * (5 + index * 0.3);
                tag.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${base * 1.02})`;
            });
        });

        rootElement.addEventListener('pointerleave', () => {
            nodes.forEach((tag) => {
                const base = Number(tag.dataset.base) || 1;
                tag.style.transform = `translate(-50%, -50%) scale(${base})`;
            });
        });

        const animateCloud = () => {
            nodes.forEach((tag) => {
                const phase = Number(tag.dataset.phase) + Number(tag.dataset.speed);
                const offset = Number(tag.dataset.offset);
                tag.dataset.phase = String(phase);
                const floatY = Math.sin(phase) * offset;
                const base = Number(tag.dataset.base) || 1;
                tag.style.transform = `translate(-50%, calc(-50% + ${floatY}px)) scale(${base})`;
            });
            requestAnimationFrame(animateCloud);
        };

        animateCloud();
    };

    // 7. Project Card Parallax
    const initProjectParallax = () => {
        const cards = document.querySelectorAll('.project-card');
        if (!cards.length) return;

        const updateParallax = () => {
            cards.forEach((card) => {
                const rect = card.getBoundingClientRect();
                const progress = (rect.top + rect.height * 0.5) / window.innerHeight;
                const clamp = (value, min, max) => Math.max(min, Math.min(value, max));
                const offsetZ = clamp((0.5 - progress) * 52, -34, 34);
                const tiltX = clamp((0.5 - progress) * 8, -8, 8);
                const tiltY = clamp((progress - 0.5) * 6, -6, 6);
                card.style.setProperty('--card-offset-z', `${offsetZ}px`);
                card.style.setProperty('--card-offset-x', `${tiltX}deg`);
                card.style.setProperty('--card-offset-yaw', `${tiltY}deg`);
            });
        };

        window.addEventListener('scroll', updateParallax);
        window.addEventListener('resize', updateParallax);
        updateParallax();
    };

    initThreeHero();
    initSkillCloud();
    initProjectParallax();
});