---
migrated: 2025-09-20T01:46:15.795281
source: apple-notes-exporter
original_path: Backup/iCloud/Be better offline /RehearSmart/! Current version/Backup/Transforming app to Liquid Glass.md
vault_folder: Inbox/to-review
---
# Transforming app to Liquid Glass

**## Project Context**
You are tasked with completely redesigning the RehearSmart iOS app to fully embrace Apple's new Liquid Glass design language introduced in iOS 26. This is a comprehensive UI/UX overhaul that will transform the app from a standard iOS interface into a cutting-edge, visually stunning experience that showcases the best of Apple's latest design system.
**## Understanding Liquid Glass Design Principles**
**## Core Concepts**
1. **Material Properties**: Liquid Glass combines optical properties of real glass with fluid, responsive behavior
2. **Dynamic Adaptation**: UI elements refract content from below, reflect ambient light, and respond with subtle animations
3. **Content-First Philosophy**: UI elements elegantly recede when users are focused on content, then expand when needed
4. **Layered Architecture**: Liquid Glass forms a distinct functional layer above content
5. **Cross-Platform Consistency**: Unified design across iOS, iPadOS, macOS, watchOS, and visionOS

**## Key Visual Characteristics**
* **Translucency with Intelligence**: Materials adapt opacity based on background content for optimal legibility
* **Real-time Rendering**: Glass effects use real-time gaussian blur and refraction
* **Specular Highlights**: Dynamic lighting effects that respond to device movement
* **Fluid Morphing**: Controls transform during interaction (toggles, sliders become liquid glass when touched)
* **Corner Concentricity**: UI elements share corner centers with their containers
* **Depth Layers**: Multiple glass layers create visual hierarchy

**## Phase 1: Project Analysis and Planning**
**## 1.1 Audit Current RehearSmart UI**
Analyze the existing RehearSmart app structure and identify:
* All current views and navigation patterns
* Custom UI components that need redesign
* Areas where Liquid Glass can enhance user experience
* Content areas vs. functional control areas

**## 1.2 Create Design System Documentation**
Document a comprehensive Liquid Glass design system for RehearSmart including:
* Color palette adapted for glass effects
* Typography that maintains legibility on translucent backgrounds
* Spacing and layout principles
* Animation timing and easing curves
* Accessibility considerations

**## 1.3 Architecture Planning**
Plan the technical implementation:
* Identify which SwiftUI 26 APIs to adopt
* Plan custom glass effect implementations
* Design state management for dynamic UI updates
* Performance optimization strategies

**## Phase 2: Core Liquid Glass Implementation**
**## 2.1 Create Base Glass Components**
**File: RehearSmart/LiquidGlass/GlassButton.swift**

swift
import SwiftUI

struct GlassButton: View {
    let title: String
    let icon: String?
    let action: () -> Void
    @State private var isPressed = false
    @Namespace private var morphNamespace
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 12) {
                if let icon = icon {
                    Image(systemName: icon)
                        .font(.system(size: 18, weight: .medium))
                        .glassEffectID("icon", in: morphNamespace)
                }
                Text(title)
                    .font(.system(size: 16, weight: .medium))
                    .glassEffectID("text", in: morphNamespace)
            }
            .padding(.horizontal, 24)
            .padding(.vertical, 14)
            .glassEffect(.prominent, in: .capsule, isInteractive: true)
            .scaleEffect(isPressed ? 0.95 : 1.0)
            .animation(.spring(response: 0.3, dampingFraction: 0.7), value: isPressed)
        }
        .buttonStyle(PlainButtonStyle())
        .onLongPressGesture(minimumDuration: 0, maximumDistance: .infinity, pressing: { pressing in
            isPressed = pressing
        }, perform: {})
    }
}
**File: RehearSmart/LiquidGlass/GlassCard.swift**

swift
import SwiftUI

struct GlassCard<Content: View>: View {
    let content: Content
    let depth: GlassDepth
    @State private var isHovered = false
    
    enum GlassDepth {
        case shallow, medium, deep
        
        var blurRadius: CGFloat {
            switch self {
            case .shallow: return 10
            case .medium: return 20
            case .deep: return 30
            }
        }
    }
    
    init(depth: GlassDepth = .medium, @ViewBuilder content: () -> Content) {
        self.depth = depth
        self.content = content()
    }
    
    var body: some View {
        content
            .padding(20)
            .glassEffect(.regular, in: .rect(cornerRadius: 20))
            .shadow(color: .black.opacity(0.1), radius: isHovered ? 20 : 10)
            .scaleEffect(isHovered ? 1.02 : 1.0)
            .animation(.spring(response: 0.4), value: isHovered)
            .onHover { hovering in
                isHovered = hovering
            }
    }
}
**File: RehearSmart/LiquidGlass/AdaptiveGlassBar.swift**

swift
import SwiftUI

struct AdaptiveGlassBar: View {
    @State private var scrollOffset: CGFloat = 0
    @State private var isMinimized = false
    let items: [BarItem]
    
    struct BarItem {
        let id: String
        let icon: String
        let title: String
        let action: () -> Void
    }
    
    var body: some View {
        HStack(spacing: isMinimized ? 8 : 20) {
            ForEach(items, id: \.id) { item in
                BarItemView(item: item, isMinimized: isMinimized)
            }
        }
        .padding(.horizontal, isMinimized ? 12 : 24)
        .padding(.vertical, isMinimized ? 8 : 16)
        .glassEffect(.prominent, in: .capsule, isInteractive: true)
        .animation(.spring(response: 0.5, dampingFraction: 0.8), value: isMinimized)
        .onPreferenceChange(ScrollOffsetPreferenceKey.self) { value in
            withAnimation {
                isMinimized = value > 50
            }
        }
    }
}
**## 2.2 Implement Dynamic Glass Effects**
**File: RehearSmart/LiquidGlass/DynamicGlassModifier.swift**

swift
import SwiftUI

struct DynamicGlassModifier: ViewModifier {
    @Environment(\.colorScheme) var colorScheme
    @State private var backgroundLuminance: Double = 0.5
    let adaptiveTint: Bool
    
    func body(content: Content) -> some View {
        content
            .background(
                GeometryReader { geometry in
                    Color.clear
                        .preference(
                            key: BackgroundLuminanceKey.self,
                            value: calculateLuminance(in: geometry)
                        )
                }
            )
            .onPreferenceChange(BackgroundLuminanceKey.self) { value in
                backgroundLuminance = value
            }
            .glassEffect(
                glassIntensity(for: backgroundLuminance),
                in: .rect(cornerRadius: 16),
                isEnabled: true
            )
            .foregroundColor(adaptiveTextColor(for: backgroundLuminance))
    }
    
    private func glassIntensity(for luminance: Double) -> GlassIntensity {
        switch luminance {
        case 0..<0.3: return .thick
        case 0.3..<0.7: return .regular
        default: return .thin
        }
    }
    
    private func adaptiveTextColor(for luminance: Double) -> Color {
        if adaptiveTint {
            return luminance > 0.6 ? .black : .white
        }
        return .primary
    }
}
**## 2.3 Create Morphing Animations**
**File: RehearSmart/LiquidGlass/MorphingContainer.swift**

swift
import SwiftUI

struct MorphingContainer<Content: View>: View {
    @Namespace private var morphSpace
    @State private var currentState: MorphState = .collapsed
    let content: (MorphState) -> Content
    
    enum MorphState {
        case collapsed, expanded, detail
    }
    
    var body: some View {
        GlassEffectContainer(spacing: 16) {
            content(currentState)
                .glassEffectID(currentState, in: morphSpace)
                .animation(.spring(response: 0.6, dampingFraction: 0.8), value: currentState)
        }
        .gesture(
            DragGesture()
                .onEnded { value in
                    withAnimation {
                        if value.translation.height < -50 {
                            currentState = currentState.next()
                        } else if value.translation.height > 50 {
                            currentState = currentState.previous()
                        }
                    }
                }
        )
    }
}
**## Phase 3: Redesign Core App Views**
**## 3.1 Redesigned Home Screen**
**File: RehearSmart/Views/LiquidGlassContentView.swift**

swift
import SwiftUI

struct LiquidGlassContentView: View {
    @StateObject private var viewModel = MainViewModel()
    @State private var showingAddSpeech = false
    @State private var selectedTab = 0
    @Namespace private var tabNamespace
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        ZStack {
            *// Dynamic background that shows through glass*

            DynamicGradientBackground()
            
            *// Main content layer*

            ScrollView {
                VStack(spacing: 24) {
                    *// Floating header with dynamic glass*

                    FloatingHeader()
                        .glassEffect(.thick, in: .capsule)
                        .padding(.horizontal)
                    
                    *// Recent sessions with morphing cards*

                    RecentSessionsSection(sessions: viewModel.recentSessions)
                    
                    *// Speeches grid with depth layers*

                    SpeechesGrid(speeches: viewModel.speeches)
                }
                .padding(.bottom, 100) *// Space for floating tab bar*

            }
            .scrollIndicators(.hidden)
            
            *// Floating glass tab bar*

            VStack {
                Spacer()
                FloatingTabBar(selectedTab: $selectedTab)
                    .padding(.horizontal)
                    .padding(.bottom, 34)
            }
        }
        .ignoresSafeArea()
    }
}

struct FloatingHeader: View {
    @State private var currentTime = Date()
    let timer = Timer.publish(every: 1, on: .main, in: .common).autoconnect()
    
    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 4) {
                Text("RehearSmart")
                    .font(.system(size: 28, weight: .bold, design: .rounded))
                    .foregroundStyle(.primary)
                
                Text(currentTime, style: .time)
                    .font(.system(size: 14, weight: .medium))
                    .foregroundStyle(.secondary)
            }
            
            Spacer()
            
            ProfileButton()
        }
        .padding(.horizontal, 20)
        .padding(.vertical, 16)
        .onReceive(timer) { _ in
            currentTime = Date()
        }
    }
}

struct RecentSessionsSection: View {
    let sessions: [PracticeSession]
    @State private var expandedSessionId: UUID?
    @Namespace private var sessionNamespace
    
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Recent Practice")
                .font(.system(size: 22, weight: .semibold))
                .padding(.horizontal, 24)
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 16) {
                    ForEach(sessions) { session in
                        RecentSessionCard(
                            session: session,
                            isExpanded: expandedSessionId == session.id,
                            namespace: sessionNamespace
                        )
                        .onTapGesture {
                            withAnimation(.spring(response: 0.5)) {
                                expandedSessionId = expandedSessionId == session.id ? nil : session.id
                            }
                        }
                    }
                }
                .padding(.horizontal, 24)
            }
        }
    }
}

struct RecentSessionCard: View {
    let session: PracticeSession
    let isExpanded: Bool
    let namespace: Namespace.ID
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            *// Accuracy visualization with liquid animation*

            AccuracyRing(accuracy: session.accuracy ?? 0)
                .frame(width: isExpanded ? 120 : 80, height: isExpanded ? 120 : 80)
                .glassEffectID("accuracy", in: namespace)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(formatDuration(session.duration))
                    .font(.system(size: 16, weight: .semibold))
                
                if isExpanded {
                    Text(session.recordedDate, style: .relative)
                        .font(.system(size: 14))
                        .foregroundStyle(.secondary)
                        .transition(.asymmetric(
                            insertion: .scale.combined(with: .opacity),
                            removal: .scale.combined(with: .opacity)
                        ))
                }
            }
            .glassEffectID("info", in: namespace)
        }
        .padding(20)
        .frame(width: isExpanded ? 180 : 140)
        .glassEffect(.regular, in: .rect(cornerRadius: 24), isInteractive: true)
        .shadow(color: .black.opacity(0.1), radius: isExpanded ? 20 : 10)
    }
    
    private func formatDuration(_ duration: TimeInterval) -> String {
        let minutes = Int(duration) / 60
        let seconds = Int(duration) % 60
        return String(format: "%d:%02d", minutes, seconds)
    }
}

struct SpeechesGrid: View {
    let speeches: [Speech]
    @State private var selectedSpeechId: UUID?
    @Namespace private var gridNamespace
    
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("My Speeches")
                .font(.system(size: 22, weight: .semibold))
                .padding(.horizontal, 24)
            
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 16) {
                ForEach(speeches) { speech in
                    SpeechCard(
                        speech: speech,
                        isSelected: selectedSpeechId == speech.id,
                        namespace: gridNamespace
                    )
                    .onTapGesture {
                        withAnimation(.spring(response: 0.5)) {
                            selectedSpeechId = speech.id
                        }
                    }
                }
                
                AddSpeechCard()
            }
            .padding(.horizontal, 24)
        }
    }
}

struct SpeechCard: View {
    let speech: Speech
    let isSelected: Bool
    let namespace: Namespace.ID
    @State private var isHovered = false
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            *// Icon with depth effect*

            ZStack {
                Circle()
                    .fill(LinearGradient(
                        colors: [Color.blue.opacity(0.3), Color.purple.opacity(0.3)],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ))
                    .frame(width: 56, height: 56)
                    .glassEffect(.thin, in: .circle)
                
                Image(systemName: "text.bubble.fill")
                    .font(.system(size: 24, weight: .medium))
                    .foregroundStyle(.white)
            }
            .glassEffectID("icon", in: namespace)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(speech.title)
                    .font(.system(size: 18, weight: .semibold))
                    .lineLimit(2)
                
                Text("\(speech.practiceSessionsCount) sessions")
                    .font(.system(size: 14))
                    .foregroundStyle(.secondary)
            }
            .glassEffectID("text", in: namespace)
            
            Spacer()
        }
        .padding(20)
        .frame(height: 180)
        .frame(maxWidth: .infinity)
        .glassEffect(
            isSelected ? .thick : .regular,
            in: .rect(cornerRadius: 24),
            isInteractive: true
        )
        .shadow(
            color: .black.opacity(isHovered ? 0.15 : 0.08),
            radius: isHovered ? 25 : 15
        )
        .scaleEffect(isSelected ? 1.05 : 1.0)
        .onHover { hovering in
            withAnimation(.spring(response: 0.3)) {
                isHovered = hovering
            }
        }
    }
}

struct FloatingTabBar: View {
    @Binding var selectedTab: Int
    @Namespace private var tabNamespace
    @State private var tabBarOffset: CGFloat = 0
    
    let tabs = [
        ("house.fill", "Home"),
        ("mic.fill", "Record"),
        ("chart.line.uptrend.xyaxis", "Progress"),
        ("gearshape.fill", "Settings")
    ]
    
    var body: some View {
        HStack(spacing: 0) {
            ForEach(Array(tabs.enumerated()), id: \.offset) { index, tab in
                TabButton(
                    icon: tab.0,
                    title: tab.1,
                    isSelected: selectedTab == index,
                    namespace: tabNamespace
                ) {
                    withAnimation(.spring(response: 0.5, dampingFraction: 0.7)) {
                        selectedTab = index
                    }
                }
            }
        }
        .padding(8)
        .glassEffect(.prominent, in: .capsule, isInteractive: true)
        .shadow(color: .black.opacity(0.15), radius: 20, y: 10)
        .offset(y: tabBarOffset)
        .onPreferenceChange(ScrollOffsetPreferenceKey.self) { value in
            withAnimation(.spring(response: 0.3)) {
                tabBarOffset = min(100, max(0, value * 0.5))
            }
        }
    }
}

struct TabButton: View {
    let icon: String
    let title: String
    let isSelected: Bool
    let namespace: Namespace.ID
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 4) {
                Image(systemName: icon)
                    .font(.system(size: 20, weight: .medium))
                    .symbolRenderingMode(.hierarchical)
                
                if isSelected {
                    Text(title)
                        .font(.system(size: 10, weight: .medium))
                        .transition(.asymmetric(
                            insertion: .scale.combined(with: .opacity),
                            removal: .scale.combined(with: .opacity)
                        ))
                }
            }
            .foregroundStyle(isSelected ? .primary : .secondary)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 8)
            .background(
                isSelected ? 
                    Capsule()
                        .fill(.thinMaterial)
                        .glassEffectID("background", in: namespace) : nil
            )
        }
        .buttonStyle(PlainButtonStyle())
    }
}
**## 3.2 Redesigned Recording Interface**
**File: RehearSmart/Views/LiquidGlassRecordingView.swift**

swift
import SwiftUI

struct LiquidGlassRecordingView: View {
    let speech: Speech
    @StateObject private var viewModel: RecordingViewModel
    @State private var waveformPhase: CGFloat = 0
    @State private var pulseAnimation = false
    @Namespace private var recordingNamespace
    @Environment(\.dismiss) var dismiss
    
    init(speech: Speech) {
        self.speech = speech
        self._viewModel = StateObject(wrappedValue: RecordingViewModel(speech: speech))
    }
    
    var body: some View {
        ZStack {
            *// Animated gradient background*

            AnimatedMeshGradient()
                .ignoresSafeArea()
            
            VStack(spacing: 40) {
                *// Minimalist glass header*

                RecordingHeader(title: speech.title) {
                    dismiss()
                }
                
                Spacer()
                
                *// Central recording visualization*

                ZStack {
                    *// Pulsing background rings*

                    ForEach(0..<3) { index in
                        Circle()
                            .stroke(
                                LinearGradient(
                                    colors: [.white.opacity(0.1), .white.opacity(0.05)],
                                    startPoint: .top,
                                    endPoint: .bottom
                                ),
                                lineWidth: 2
                            )
                            .scaleEffect(pulseAnimation ? 1.5 + Double(index) * 0.3 : 1.0)
                            .opacity(pulseAnimation ? 0 : 0.5)
                            .animation(
                                .easeOut(duration: 2)
                                .repeatForever(autoreverses: false)
                                .delay(Double(index) * 0.3),
                                value: pulseAnimation
                            )
                    }
                    
                    *// Liquid waveform visualization*

                    LiquidWaveform(
                        audioLevel: viewModel.audioLevel,
                        isRecording: viewModel.isRecording,
                        phase: waveformPhase
                    )
                    .frame(width: 240, height: 240)
                    .glassEffect(.thick, in: .circle, isInteractive: true)
                    
                    *// Time display*

                    VStack(spacing: 8) {
                        Text(formatTime(viewModel.recordingTime))
                            .font(.system(size: 48, weight: .thin, design: .monospaced))
                            .foregroundStyle(.white)
                        
                        if viewModel.isPaused {
                            Text("PAUSED")
                                .font(.system(size: 12, weight: .medium))
                                .foregroundStyle(.white.opacity(0.7))
                                .transition(.scale.combined(with: .opacity))
                        }
                    }
                }
                
                Spacer()
                
                *// Morphing control buttons*

                RecordingControls(
                    isRecording: viewModel.isRecording,
                    isPaused: viewModel.isPaused,
                    namespace: recordingNamespace,
                    onStart: {
                        Task {
                            await viewModel.startRecording()
                            pulseAnimation = true
                        }
                    },
                    onPause: { viewModel.pauseRecording() },
                    onResume: { viewModel.resumeRecording() },
                    onStop: {
                        Task {
                            await viewModel.stopRecording()
                            dismiss()
                        }
                    }
                )
                .padding(.bottom, 50)
            }
            
            *// Processing overlay with glass effect*

            if viewModel.isProcessing {
                LiquidGlassProcessingOverlay()
            }
        }
        .onAppear {
            withAnimation(.linear(duration: 2).repeatForever(autoreverses: false)) {
                waveformPhase = .pi * 2
            }
        }
    }
    
    private func formatTime(_ time: TimeInterval) -> String {
        let minutes = Int(time) / 60
        let seconds = Int(time) % 60
        let milliseconds = Int((time.truncatingRemainder(dividingBy: 1)) * 100)
        return String(format: "%02d:%02d.%02d", minutes, seconds, milliseconds)
    }
}

struct RecordingHeader: View {
    let title: String
    let onCancel: () -> Void
    
    var body: some View {
        HStack {
            Button(action: onCancel) {
                Image(systemName: "xmark.circle.fill")
                    .font(.system(size: 28))
                    .symbolRenderingMode(.hierarchical)
                    .foregroundStyle(.white.opacity(0.8))
            }
            .buttonStyle(PlainButtonStyle())
            
            Spacer()
            
            Text(title)
                .font(.system(size: 18, weight: .medium))
                .foregroundStyle(.white.opacity(0.9))
                .lineLimit(1)
            
            Spacer()
            
            *// Balance the header*

            Color.clear
                .frame(width: 28, height: 28)
        }
        .padding(.horizontal, 24)
        .padding(.vertical, 16)
        .glassEffect(.thin, in: .capsule)
        .padding(.horizontal)
        .padding(.top)
    }
}

struct LiquidWaveform: View {
    let audioLevel: Float
    let isRecording: Bool
    let phase: CGFloat
    
    var body: some View {
        Canvas { context, size in
            let center = CGPoint(x: size.width / 2, y: size.height / 2)
            let radius = min(size.width, size.height) / 2
            
            *// Create liquid waveform path*

            var path = Path()
            let steps = 100
            
            for i in 0...steps {
                let angle = (CGFloat(i) / CGFloat(steps)) * .pi * 2
                let normalizedLevel = CGFloat(max(0, audioLevel + 60) / 60)
                
                *// Create organic wave pattern*

                let waveAmplitude = normalizedLevel * 20
                let waveFrequency: CGFloat = 6
                let distortion = sin(angle * waveFrequency + phase) * waveAmplitude
                
                let r = radius - 20 + distortion
                let x = center.x + cos(angle) * r
                let y = center.y + sin(angle) * r
                
                if i == 0 {
                    path.move(to: CGPoint(x: x, y: y))
                } else {
                    path.addLine(to: CGPoint(x: x, y: y))
                }
            }
            path.closeSubpath()
            
            *// Apply gradient fill*

            let gradient = Gradient(colors: [
                .blue.opacity(0.3),
                .purple.opacity(0.3),
                .pink.opacity(0.3)
            ])
            
            context.fill(
                path,
                with: .linearGradient(
                    gradient,
                    startPoint: .zero,
                    endPoint: CGPoint(x: size.width, y: size.height)
                )
            )
            
            *// Add glow effect*

            context.addFilter(.blur(radius: 10))
            context.fill(
                path,
                with: .linearGradient(
                    gradient,
                    startPoint: .zero,
                    endPoint: CGPoint(x: size.width, y: size.height)
                )
            )
        }
    }
}

struct RecordingControls: View {
    let isRecording: Bool
    let isPaused: Bool
    let namespace: Namespace.ID
    let onStart: () -> Void
    let onPause: () -> Void
    let onResume: () -> Void
    let onStop: () -> Void
    
    var body: some View {
        HStack(spacing: 40) {
            if !isRecording {
                *// Start button*

                Button(action: onStart) {
                    ZStack {
                        Circle()
                            .fill(
                                LinearGradient(
                                    colors: [.red, .pink],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            )
                            .frame(width: 80, height: 80)
                        
                        Image(systemName: "mic.fill")
                            .font(.system(size: 32))
                            .foregroundStyle(.white)
                    }
                    .glassEffectID("mainButton", in: namespace)
                }
                .buttonStyle(ScaleButtonStyle())
            } else {
                *// Pause/Resume button*

                Button(action: isPaused ? onResume : onPause) {
                    ZStack {
                        Circle()
                            .fill(
                                LinearGradient(
                                    colors: [.orange, .yellow],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            )
                            .frame(width: 60, height: 60)
                        
                        Image(systemName: isPaused ? "play.fill" : "pause.fill")
                            .font(.system(size: 24))
                            .foregroundStyle(.white)
                    }
                    .glassEffectID("secondaryButton", in: namespace)
                }
                .buttonStyle(ScaleButtonStyle())
                
                *// Stop button*

                Button(action: onStop) {
                    ZStack {
                        Circle()
                            .fill(
                                LinearGradient(
                                    colors: [.red, .pink],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            )
                            .frame(width: 80, height: 80)
                        
                        RoundedRectangle(cornerRadius: 4)
                            .fill(.white)
                            .frame(width: 28, height: 28)
                    }
                    .glassEffectID("mainButton", in: namespace)
                }
                .buttonStyle(ScaleButtonStyle())
            }
        }
        .padding(.horizontal, 40)
        .padding(.vertical, 20)
        .glassEffect(.thick, in: .capsule, isInteractive: true)
    }
}

struct ScaleButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.9 : 1.0)
            .animation(.spring(response: 0.3, dampingFraction: 0.6), value: configuration.isPressed)
    }
}

struct LiquidGlassProcessingOverlay: View {
    @State private var rotation: Double = 0
    @State private var scale: CGFloat = 1.0
    
    var body: some View {
        ZStack {
            *// Blurred background*

            Color.black.opacity(0.3)
                .ignoresSafeArea()
                .blur(radius: 20)
            
            VStack(spacing: 30) {
                *// Liquid loading animation*

                ZStack {
                    ForEach(0..<3) { index in
                        Circle()
                            .stroke(
                                LinearGradient(
                                    colors: [.blue, .purple, .pink],
                                    startPoint: .leading,
                                    endPoint: .trailing
                                ),
                                lineWidth: 3
                            )
                            .frame(width: 60 + CGFloat(index) * 20, height: 60 + CGFloat(index) * 20)
                            .rotationEffect(.degrees(rotation + Double(index) * 120))
                            .scaleEffect(scale)
                            .opacity(0.8 - Double(index) * 0.2)
                    }
                }
                .glassEffect(.thick, in: .circle)
                .frame(width: 120, height: 120)
                
                Text("Processing your recording...")
                    .font(.system(size: 18, weight: .medium))
                    .foregroundStyle(.white)
            }
            .padding(40)
            .glassEffect(.prominent, in: .rect(cornerRadius: 30))
        }
        .onAppear {
            withAnimation(.linear(duration: 2).repeatForever(autoreverses: false)) {
                rotation = 360
            }
            withAnimation(.easeInOut(duration: 1).repeatForever(autoreverses: true)) {
                scale = 1.1
            }
        }
    }
}
**## 3.3 Redesigned Comparison View**
**File: RehearSmart/Views/LiquidGlassComparisonView.swift**

swift
import SwiftUI

struct LiquidGlassComparisonView: View {
    let originalText: String
    let transcribedText: String
    @State private var comparisonResult: ComparisonResult?
    @State private var viewMode: ViewMode = .flow
    @State private var highlightedDifference: Int?
    @Namespace private var comparisonNamespace
    @Environment(\.dismiss) var dismiss
    
    enum ViewMode: String, CaseIterable {
        case flow = "Flow"
        case sideBySide = "Side by Side"
        case focus = "Focus Mode"
        
        var icon: String {
            switch self {
            case .flow: return "text.alignleft"
            case .sideBySide: return "square.split.2x1"
            case .focus: return "viewfinder"
            }
        }
    }
    
    var body: some View {
        ZStack {
            *// Dynamic background*

            DynamicComparisonBackground(accuracy: comparisonResult?.accuracy ?? 0)
                .ignoresSafeArea()
            
            VStack(spacing: 0) {
                *// Glass header with mode selector*

                ComparisonHeader(
                    accuracy: comparisonResult?.accuracy ?? 0,
                    viewMode: $viewMode,
                    onDismiss: { dismiss() }
                )
                
                *// Content area with selected view*

                ScrollView {
                    Group {
                        switch viewMode {
                        case .flow:
                            FlowComparisonView(
                                result: comparisonResult,
                                highlightedDifference: $highlightedDifference,
                                namespace: comparisonNamespace
                            )
                        case .sideBySide:
                            SideBySideGlassView(
                                originalText: originalText,
                                transcribedText: transcribedText,
                                result: comparisonResult
                            )
                        case .focus:
                            FocusComparisonView(
                                result: comparisonResult,
                                highlightedDifference: $highlightedDifference
                            )
                        }
                    }
                    .padding()
                    .transition(.asymmetric(
                        insertion: .scale.combined(with: .opacity),
                        removal: .scale.combined(with: .opacity)
                    ))
                }
                
                *// Floating statistics bar*

                if let result = comparisonResult {
                    ComparisonStatisticsBar(result: result)
                        .padding()
                }
            }
        }
        .onAppear {
            comparisonResult = ComparisonService.compare(
                original: originalText,
                transcribed: transcribedText
            )
        }
    }
}

struct ComparisonHeader: View {
    let accuracy: Double
    @Binding var viewMode: LiquidGlassComparisonView.ViewMode
    let onDismiss: () -> Void
    
    var body: some View {
        VStack(spacing: 16) {
            HStack {
                Button(action: onDismiss) {
                    Image(systemName: "xmark.circle.fill")
                        .font(.system(size: 28))
                        .symbolRenderingMode(.hierarchical)
                        .foregroundStyle(.white.opacity(0.8))
                }
                
                Spacer()
                
                *// Accuracy badge*

                AccuracyBadge(accuracy: accuracy)
                
                Spacer()
                
                *// Balance*

                Color.clear.frame(width: 28, height: 28)
            }
            
            *// View mode selector*

            HStack(spacing: 0) {
                ForEach(LiquidGlassComparisonView.ViewMode.allCases, id: \.self) { mode in
                    ViewModeButton(
                        mode: mode,
                        isSelected: viewMode == mode,
                        action: { viewMode = mode }
                    )
                }
            }
            .padding(4)
            .glassEffect(.regular, in: .capsule)
        }
        .padding()
        .glassEffect(.thick, in: .rect(cornerRadius: 30, style: .continuous))
        .padding()
    }
}

struct AccuracyBadge: View {
    let accuracy: Double
    @State private var animatedAccuracy: Double = 0
    
    var accuracyColor: Color {
        switch accuracy {
        case 90...: return .green
        case 70..<90: return .orange
        default: return .red
        }
    }
    
    var body: some View {
        HStack(spacing: 8) {
            Circle()
                .trim(from: 0, to: animatedAccuracy / 100)
                .stroke(
                    accuracyColor,
                    style: StrokeStyle(lineWidth: 3, lineCap: .round)
                )
                .frame(width: 30, height: 30)
                .rotationEffect(.degrees(-90))
                .animation(.spring(response: 1, dampingFraction: 0.8), value: animatedAccuracy)
            
            Text("\(Int(animatedAccuracy))%")
                .font(.system(size: 18, weight: .semibold, design: .rounded))
                .foregroundStyle(accuracyColor)
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 8)
        .glassEffect(.thin, in: .capsule)
        .onAppear {
            animatedAccuracy = accuracy
        }
    }
}

struct FlowComparisonView: View {
    let result: ComparisonResult?
    @Binding var highlightedDifference: Int?
    let namespace: Namespace.ID
    
    var body: some View {
        if let result = result {
            VStack(alignment: .leading, spacing: 20) {
                *// Original text with inline differences*

                TextFlowSection(
                    title: "Original",
                    words: result.originalWords,
                    differences: result.differences.filter { $0.type == .missing },
                    highlightColor: .red,
                    namespace: namespace
                )
                
                *// Transcribed text with inline differences*

                TextFlowSection(
                    title: "Your Performance",
                    words: result.transcribedWords,
                    differences: result.differences.filter { $0.type == .added || $0.type == .different },
                    highlightColor: .orange,
                    namespace: namespace
                )
            }
        }
    }
}

struct TextFlowSection: View {
    let title: String
    let words: [String]
    let differences: [ComparisonResult.Difference]
    let highlightColor: Color
    let namespace: Namespace.ID
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(title)
                .font(.system(size: 20, weight: .semibold))
                .foregroundStyle(.white.opacity(0.9))
            
            FlowLayout(spacing: 8) {
                ForEach(Array(words.enumerated()), id: \.offset) { index, word in
                    WordChip(
                        word: word,
                        isHighlighted: differences.contains { 
                            ($0.type == .missing && $0.originalIndex == index) ||
                            ($0.type == .added && $0.transcribedIndex == index) ||
                            ($0.type == .different && ($0.originalIndex == index || $0.transcribedIndex == index))
                        },
                        highlightColor: highlightColor,
                        namespace: namespace,
                        id: "\(title)-\(index)"
                    )
                }
            }
        }
        .padding(24)
        .glassEffect(.regular, in: .rect(cornerRadius: 20))
    }
}

struct WordChip: View {
    let word: String
    let isHighlighted: Bool
    let highlightColor: Color
    let namespace: Namespace.ID
    let id: String
    @State private var isPressed = false
    
    var body: some View {
        Text(word)
            .font(.system(size: 16, weight: isHighlighted ? .medium : .regular))
            .foregroundStyle(isHighlighted ? .white : .white.opacity(0.8))
            .padding(.horizontal, 12)
            .padding(.vertical, 6)
            .background(
                Group {
                    if isHighlighted {
                        Capsule()
                            .fill(highlightColor.opacity(0.3))
                            .glassEffect(.thin, in: .capsule)
                            .glassEffectID(id, in: namespace)
                    }
                }
            )
            .scaleEffect(isPressed ? 0.95 : 1.0)
            .animation(.spring(response: 0.3), value: isPressed)
            .onTapGesture {
                withAnimation(.spring(response: 0.3)) {
                    isPressed = true
                }
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                    isPressed = false
                }
            }
    }
}

struct ComparisonStatisticsBar: View {
    let result: ComparisonResult
    @State private var isExpanded = false
    @Namespace private var statsNamespace
    
    var statistics: [(String, String, Color)] {
        let missing = result.differences.filter { $0.type == .missing }.count
        let added = result.differences.filter { $0.type == .added }.count
        let different = result.differences.filter { $0.type == .different }.count
        
        return [
            ("Accuracy", "\(Int(result.accuracy ?? 0))%", accuracyColor(result.accuracy ?? 0)),
            ("Missing", "\(missing)", .red),
            ("Added", "\(added)", .orange),
            ("Different", "\(different)", .yellow)
        ]
    }
    
    var body: some View {
        HStack(spacing: isExpanded ? 16 : 8) {
            ForEach(statistics, id: \.0) { stat in
                StatisticPill(
                    label: stat.0,
                    value: stat.1,
                    color: stat.2,
                    isExpanded: isExpanded,
                    namespace: statsNamespace
                )
            }
        }
        .padding(isExpanded ? 16 : 12)
        .glassEffect(.prominent, in: .capsule, isInteractive: true)
        .onTapGesture {
            withAnimation(.spring(response: 0.5)) {
                isExpanded.toggle()
            }
        }
    }
    
    private func accuracyColor(_ accuracy: Double) -> Color {
        switch accuracy {
        case 90...: return .green
        case 70..<90: return .orange
        default: return .red
        }
    }
}

struct StatisticPill: View {
    let label: String
    let value: String
    let color: Color
    let isExpanded: Bool
    let namespace: Namespace.ID
    
    var body: some View {
        VStack(spacing: 4) {
            if isExpanded {
                Text(label)
                    .font(.system(size: 12, weight: .medium))
                    .foregroundStyle(.white.opacity(0.7))
                    .transition(.asymmetric(
                        insertion: .scale.combined(with: .opacity),
                        removal: .scale.combined(with: .opacity)
                    ))
            }
            
            Text(value)
                .font(.system(size: isExpanded ? 20 : 16, weight: .semibold, design: .rounded))
                .foregroundStyle(color)
                .glassEffectID("\(label)-value", in: namespace)
        }
        .frame(minWidth: isExpanded ? 60 : 40)
        .padding(.vertical, isExpanded ? 8 : 4)
        .padding(.horizontal, isExpanded ? 12 : 8)
        .background(
            Capsule()
                .fill(color.opacity(0.2))
                .glassEffect(.thin, in: .capsule)
        )
    }
}
**## Phase 4: Advanced Glass Effects and Animations**
**## 4.1 Dynamic Background System**
**File: RehearSmart/LiquidGlass/DynamicBackgrounds.swift**

swift
import SwiftUI

struct DynamicGradientBackground: View {
    @State private var gradientRotation: Double = 0
    @State private var gradientOffset: CGSize = .zero
    
    var body: some View {
        ZStack {
            *// Base gradient*

            LinearGradient(
                colors: [
                    Color(red: 0.1, green: 0.1, blue: 0.3),
                    Color(red: 0.2, green: 0.1, blue: 0.4),
                    Color(red: 0.3, green: 0.2, blue: 0.5)
                ],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            
            *// Animated mesh gradient overlay*

            MeshGradient(
                width: 3,
                height: 3,
                points: [
                    .init(0, 0), .init(0.5, 0), .init(1, 0),
                    .init(0, 0.5), .init(0.5 + gradientOffset.width * 0.001, 0.5 + gradientOffset.height * 0.001), .init(1, 0.5),
                    .init(0, 1), .init(0.5, 1), .init(1, 1)
                ],
                colors: [
                    .blue.opacity(0.3), .purple.opacity(0.3), .pink.opacity(0.3),
                    .purple.opacity(0.3), .clear, .blue.opacity(0.3),
                    .pink.opacity(0.3), .blue.opacity(0.3), .purple.opacity(0.3)
                ]
            )
            .rotationEffect(.degrees(gradientRotation))
            .blur(radius: 40)
        }
        .onAppear {
            withAnimation(.linear(duration: 20).repeatForever(autoreverses: false)) {
                gradientRotation = 360
            }
            withAnimation(.easeInOut(duration: 8).repeatForever(autoreverses: true)) {
                gradientOffset = CGSize(width: 100, height: 100)
            }
        }
    }
}

struct AnimatedMeshGradient: View {
    @State private var phase: CGFloat = 0
    
    var body: some View {
        TimelineView(.animation) { timeline in
            Canvas { context, size in
                let time = timeline.date.timeIntervalSinceReferenceDate
                
                *// Create animated mesh points*

                var points: [CGPoint] = []
                let gridSize = 5
                
                for row in 0..<gridSize {
                    for col in 0..<gridSize {
                        let baseX = CGFloat(col) / CGFloat(gridSize - 1) * size.width
                        let baseY = CGFloat(row) / CGFloat(gridSize - 1) * size.height
                        
                        *// Add wave distortion*

                        let waveX = sin(time + CGFloat(row) * 0.5) * 20
                        let waveY = cos(time + CGFloat(col) * 0.5) * 20
                        
                        points.append(CGPoint(x: baseX + waveX, y: baseY + waveY))
                    }
                }
                
                *// Draw mesh with gradients*

                for row in 0..<(gridSize - 1) {
                    for col in 0..<(gridSize - 1) {
                        let topLeft = points[row * gridSize + col]
                        let topRight = points[row * gridSize + col + 1]
                        let bottomLeft = points[(row + 1) * gridSize + col]
                        let bottomRight = points[(row + 1) * gridSize + col + 1]
                        
                        var path = Path()
                        path.move(to: topLeft)
                        path.addLine(to: topRight)
                        path.addLine(to: bottomRight)
                        path.addLine(to: bottomLeft)
                        path.closeSubpath()
                        
                        let hue = (CGFloat(row + col) / CGFloat(2 * gridSize)) + CGFloat(time * 0.1).truncatingRemainder(dividingBy: 1)
                        let color = Color(hue: hue, saturation: 0.7, brightness: 0.6)
                        
                        context.fill(path, with: .color(color.opacity(0.3)))
                    }
                }
            }
        }
    }
}

struct DynamicComparisonBackground: View {
    let accuracy: Double
    @State private var particleSystem = ParticleSystem()
    
    var backgroundColors: [Color] {
        switch accuracy {
        case 90...:
            return [.green.opacity(0.2), .blue.opacity(0.2)]
        case 70..<90:
            return [.orange.opacity(0.2), .yellow.opacity(0.2)]
        default:
            return [.red.opacity(0.2), .orange.opacity(0.2)]
        }
    }
    
    var body: some View {
        ZStack {
            *// Base gradient*

            LinearGradient(
                colors: backgroundColors,
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            
            *// Particle effect overlay*

            TimelineView(.animation) { timeline in
                Canvas { context, size in
                    particleSystem.update(date: timeline.date)
                    
                    for particle in particleSystem.particles {
                        var path = Path()
                        path.addEllipse(in: CGRect(
                            x: particle.position.x - particle.size / 2,
                            y: particle.position.y - particle.size / 2,
                            width: particle.size,
                            height: particle.size
                        ))
                        
                        context.fill(
                            path,
                            with: .color(particle.color.opacity(particle.opacity))
                        )
                    }
                }
            }
            .blur(radius: 2)
        }
    }
}

struct ParticleSystem {
    var particles: [Particle] = []
    private var lastUpdate = Date()
    
    struct Particle {
        var position: CGPoint
        var velocity: CGVector
        var size: CGFloat
        var color: Color
        var opacity: Double
        var lifetime: Double
    }
    
    init() {
        *// Initialize particles*

        for _ in 0..<50 {
            particles.append(createParticle())
        }
    }
    
    mutating func update(date: Date) {
        let deltaTime = date.timeIntervalSince(lastUpdate)
        lastUpdate = date
        
        for i in particles.indices {
            *// Update position*

            particles[i].position.x += particles[i].velocity.dx * CGFloat(deltaTime)
            particles[i].position.y += particles[i].velocity.dy * CGFloat(deltaTime)
            
            *// Update lifetime and opacity*

            particles[i].lifetime -= deltaTime
            particles[i].opacity = max(0, particles[i].lifetime / 3.0)
            
            *// Reset particle if dead*

            if particles[i].lifetime <= 0 {
                particles[i] = createParticle()
            }
        }
    }
    
    private func createParticle() -> Particle {
        Particle(
            position: CGPoint(
                x: CGFloat.random(in: 0...UIScreen.main.bounds.width),
                y: CGFloat.random(in: 0...UIScreen.main.bounds.height)
            ),
            velocity: CGVector(
                dx: CGFloat.random(in: -20...20),
                dy: CGFloat.random(in: -30...-10)
            ),
            size: CGFloat.random(in: 2...6),
            color: [.white, .blue, .purple].randomElement()!,
            opacity: Double.random(in: 0.3...0.7),
            lifetime: Double.random(in: 2...4)
        )
    }
}
**## 4.2 Custom Glass Transitions**
**File: RehearSmart/LiquidGlass/GlassTransitions.swift**

swift
import SwiftUI

struct LiquidGlassTransition: ViewModifier {
    let isPresented: Bool
    @State private var glassOpacity: Double = 0
    @State private var contentScale: CGFloat = 0.8
    @State private var blurRadius: CGFloat = 20
    
    func body(content: Content) -> some View {
        content
            .scaleEffect(isPresented ? 1 : contentScale)
            .blur(radius: isPresented ? 0 : blurRadius)
            .opacity(isPresented ? 1 : 0)
            .overlay(
                Rectangle()
                    .fill(.ultraThinMaterial)
                    .opacity(isPresented ? 0 : glassOpacity)
                    .allowsHitTesting(false)
            )
            .animation(.spring(response: 0.6, dampingFraction: 0.8), value: isPresented)
            .onChange(of: isPresented) { newValue in
                withAnimation(.easeOut(duration: 0.3)) {
                    glassOpacity = newValue ? 0 : 0.5
                    contentScale = newValue ? 1 : 0.8
                    blurRadius = newValue ? 0 : 20
                }
            }
    }
}

extension View {
    func liquidGlassTransition(isPresented: Bool) -> some View {
        modifier(LiquidGlassTransition(isPresented: isPresented))
    }
}

struct MorphingGlassTransition: Transition {
    func body(content: Content, phase: TransitionPhase) -> some View {
        content
            .scaleEffect(
                phase.isIdentity ? 1 : 0.8,
                anchor: phase == .willAppear ? .bottom : .top
            )
            .opacity(phase.isIdentity ? 1 : 0)
            .blur(radius: phase.isIdentity ? 0 : 10)
            .offset(y: phase.isIdentity ? 0 : (phase == .willAppear ? 50 : -50))
    }
}

extension AnyTransition {
    static var morphingGlass: AnyTransition {
        .modifier(
            active: MorphingGlassTransition(),
            identity: MorphingGlassTransition()
        )
    }
}
**## Phase 5: Accessibility and Performance**
**## 5.1 Accessibility Enhancements**
**File: RehearSmart/LiquidGlass/AccessibilityModifiers.swift**

swift
import SwiftUI

struct AdaptiveGlassModifier: ViewModifier {
    @Environment(\.accessibilityReduceTransparency) var reduceTransparency
    @Environment(\.accessibilityReduceMotion) var reduceMotion
    @Environment(\.colorSchemeContrast) var colorContrast
    
    let glassIntensity: GlassIntensity
    let shape: AnyShape
    
    func body(content: Content) -> some View {
        if reduceTransparency {
            *// Fallback to solid background for accessibility*

            content
                .background(
                    shape
                        .fill(Color(UIColor.secondarySystemBackground))
                        .shadow(color: .black.opacity(0.1), radius: 5)
                )
        } else {
            *// Full glass effect*

            content
                .glassEffect(
                    adaptiveIntensity,
                    in: shape,
                    isEnabled: !reduceTransparency
                )
        }
    }
    
    private var adaptiveIntensity: GlassIntensity {
        if colorContrast == .increased {
            return .thick
        }
        return glassIntensity
    }
}

struct MotionAdaptiveModifier: ViewModifier {
    @Environment(\.accessibilityReduceMotion) var reduceMotion
    let animation: Animation?
    let value: any Equatable
    
    func body(content: Content) -> some View {
        if reduceMotion {
            content
        } else {
            content.animation(animation, value: value)
        }
    }
}

extension View {
    func adaptiveGlass(
        _ intensity: GlassIntensity = .regular,
        in shape: any Shape = .rect(cornerRadius: 16)
    ) -> some View {
        modifier(AdaptiveGlassModifier(
            glassIntensity: intensity,
            shape: AnyShape(shape)
        ))
    }
    
    func adaptiveAnimation<V: Equatable>(
        _ animation: Animation?,
        value: V
    ) -> some View {
        modifier(MotionAdaptiveModifier(
            animation: animation,
            value: value
        ))
    }
}
**## 5.2 Performance Optimizations**
**File: RehearSmart/LiquidGlass/PerformanceOptimizations.swift**

swift
import SwiftUI

@MainActor
class GlassEffectCache: ObservableObject {
    static let shared = GlassEffectCache()
    
    private var cachedEffects: [String: AnyView] = [:]
    private let cacheLimit = 50
    
    func cachedGlassView<Content: View>(
        key: String,
        content: () -> Content
    ) -> AnyView {
        if let cached = cachedEffects[key] {
            return cached
        }
        
        let view = AnyView(content())
        
        if cachedEffects.count >= cacheLimit {
            *// Remove oldest cached effect*

            cachedEffects.removeValue(forKey: cachedEffects.keys.first!)
        }
        
        cachedEffects[key] = view
        return view
    }
    
    func clearCache() {
        cachedEffects.removeAll()
    }
}

struct OptimizedGlassEffect: ViewModifier {
    let intensity: GlassIntensity
    let shape: AnyShape
    @State private var isVisible = false
    
    func body(content: Content) -> some View {
        content
            .onAppear {
                *// Delay glass effect rendering for smoother initial load*

                DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                    withAnimation(.easeIn(duration: 0.3)) {
                        isVisible = true
                    }
                }
            }
            .glassEffect(
                intensity,
                in: shape,
                isEnabled: isVisible
            )
    }
}

*// Lazy loading for heavy glass components*

struct LazyGlassView<Content: View>: View {
    let threshold: CGFloat
    let content: () -> Content
    @State private var hasAppeared = false
    
    var body: some View {
        GeometryReader { geometry in
            if hasAppeared {
                content()
            } else {
                Color.clear
                    .onAppear {
                        if geometry.frame(in: .global).minY < UIScreen.main.bounds.height + threshold {
                            hasAppeared = true
                        }
                    }
            }
        }
    }
}
**## Phase 6: Integration and Polish**
**## 6.1 App-Wide Style Configuration**
**File: RehearSmart/LiquidGlass/LiquidGlassTheme.swift**

swift
import SwiftUI

struct LiquidGlassTheme {
    *// Glass intensities for different UI elements*

    static let navigationGlass: GlassIntensity = .prominent
    static let cardGlass: GlassIntensity = .regular
    static let buttonGlass: GlassIntensity = .thin
    static let overlayGlass: GlassIntensity = .thick
    
    *// Animation configurations*

    static let standardSpring = Animation.spring(response: 0.5, dampingFraction: 0.8)
    static let quickSpring = Animation.spring(response: 0.3, dampingFraction: 0.7)
    static let smoothSpring = Animation.spring(response: 0.6, dampingFraction: 0.9)
    
    *// Corner radius standards*

    static let smallCornerRadius: CGFloat = 12
    static let mediumCornerRadius: CGFloat = 20
    static let largeCornerRadius: CGFloat = 30
    
    *// Spacing standards*

    static let tinySpacing: CGFloat = 4
    static let smallSpacing: CGFloat = 8
    static let mediumSpacing: CGFloat = 16
    static let largeSpacing: CGFloat = 24
    static let xLargeSpacing: CGFloat = 32
    
    *// Glass colors*

    static let glassAccentColors = [
        Color.blue.opacity(0.3),
        Color.purple.opacity(0.3),
        Color.pink.opacity(0.3)
    ]
}

*// Environment key for theme*

struct LiquidGlassThemeKey: EnvironmentKey {
    static let defaultValue = LiquidGlassTheme()
}

extension EnvironmentValues {
    var liquidGlassTheme: LiquidGlassTheme {
        get { self[LiquidGlassThemeKey.self] }
        set { self[LiquidGlassThemeKey.self] = newValue }
    }
}

*// Custom view modifiers for consistent styling*

extension View {
    func glassCard(depth: GlassCard<EmptyView>.GlassDepth = .medium) -> some View {
        self
            .padding(LiquidGlassTheme.mediumSpacing)
            .glassEffect(LiquidGlassTheme.cardGlass, in: .rect(cornerRadius: LiquidGlassTheme.mediumCornerRadius))
    }
    
    func glassButton() -> some View {
        self
            .padding(.horizontal, LiquidGlassTheme.largeSpacing)
            .padding(.vertical, LiquidGlassTheme.smallSpacing)
            .glassEffect(LiquidGlassTheme.buttonGlass, in: .capsule, isInteractive: true)
    }
    
    func floatingGlass() -> some View {
        self
            .glassEffect(LiquidGlassTheme.navigationGlass, in: .capsule)
            .shadow(color: .black.opacity(0.15), radius: 20, y: 10)
    }
}
**## 6.2 Updated App Entry Point**
**File: RehearSmart/App/LiquidGlassRehearSmartApp.swift**

swift
import SwiftUI

@main
struct LiquidGlassRehearSmartApp: App {
    @StateObject private var storageManager = StorageManager.shared
    @StateObject private var glassEffectCache = GlassEffectCache.shared
    @Environment(\.scenePhase) var scenePhase
    
    var body: some Scene {
        WindowGroup {
            LiquidGlassContentView()
                .environment(\.liquidGlassTheme, LiquidGlassTheme())
                .environmentObject(storageManager)
                .environmentObject(glassEffectCache)
                .preferredColorScheme(.dark) *// Liquid Glass looks best in dark mode*

                .tint(.white) *// Ensure good contrast on glass*

                .onChange(of: scenePhase) { newPhase in
                    switch newPhase {
                    case .background:
                        *// Clear glass effect cache to save memory*

                        glassEffectCache.clearCache()
                    case .active:
                        *// Pre-warm common glass effects*

                        preloadGlassEffects()
                    default:
                        break
                    }
                }
        }
        .windowStyle(.plain) *// Remove default window chrome*

        .windowResizability(.contentSize) *// Fluid window resizing*

        .commands {
            *// Add custom menu commands for glass effects*

            CommandMenu("View") {
                Button("Toggle Glass Effects") {
                    NotificationCenter.default.post(name: .toggleGlassEffects, object: nil)
                }
                .keyboardShortcut("g", modifiers: [.command, .shift])
            }
        }
    }
    
    private func preloadGlassEffects() {
        *// Pre-render common glass effects for better performance*

        Task {
            await MainActor.run {
                _ = glassEffectCache.cachedGlassView(key: "navigation") {
                    Color.clear.glassEffect(.prominent, in: .capsule)
                }
                _ = glassEffectCache.cachedGlassView(key: "card") {
                    Color.clear.glassEffect(.regular, in: .rect(cornerRadius: 20))
                }
            }
        }
    }
}

extension Notification.Name {
    static let toggleGlassEffects = Notification.Name("toggleGlassEffects")
}
**## Phase 7: Testing and Quality Assurance**
**## 7.1 Create Glass Effect Preview Environment**
**File: RehearSmart/Previews/GlassEffectPreviews.swift**

swift
import SwiftUI

struct GlassEffectPreviews: View {
    let backgroundImages = ["gradient1", "gradient2", "gradient3"]
    @State private var currentBackground = 0
    @State private var glassSamples: [GlassSample] = GlassSample.allSamples
    
    struct GlassSample: Identifiable {
        let id = UUID()
        let name: String
        let intensity: GlassIntensity
        let shape: AnyShape
        
        static let allSamples = [
            GlassSample(name: "Navigation", intensity: .prominent, shape: AnyShape(Capsule())),
            GlassSample(name: "Card", intensity: .regular, shape: AnyShape(RoundedRectangle(cornerRadius: 20))),
            GlassSample(name: "Button", intensity: .thin, shape: AnyShape(Capsule())),
            GlassSample(name: "Overlay", intensity: .thick, shape: AnyShape(RoundedRectangle(cornerRadius: 30)))
        ]
    }
    
    var body: some View {
        ZStack {
            *// Dynamic background*

            Image(backgroundImages[currentBackground])
                .resizable()
                .aspectRatio(contentMode: .fill)
                .ignoresSafeArea()
            
            ScrollView {
                VStack(spacing: 30) {
                    *// Header*

                    Text("Liquid Glass Effect Gallery")
                        .font(.largeTitle)
                        .bold()
                        .foregroundStyle(.white)
                        .padding()
                        .glassEffect(.prominent, in: .capsule)
                    
                    *// Glass samples grid*

                    LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 20) {
                        ForEach(glassSamples) { sample in
                            GlassSampleView(sample: sample)
                        }
                    }
                    .padding()
                    
                    *// Interactive controls*

                    VStack(spacing: 20) {
                        Text("Interactive Glass Controls")
                            .font(.title2)
                            .foregroundStyle(.white)
                        
                        HStack(spacing: 20) {
                            ForEach(0..<3) { index in
                                GlassButton(
                                    title: "Button \(index + 1)",
                                    icon: ["star.fill", "heart.fill", "bolt.fill"][index]
                                ) {
                                    print("Button \(index + 1) tapped")
                                }
                            }
                        }
                        
                        *// Glass slider*

                        GlassSlider(value: .constant(0.5))
                            .frame(width: 300)
                        
                        *// Glass toggle*

                        GlassToggle(isOn: .constant(true), label: "Enable Effects")
                    }
                    .padding()
                    .glassEffect(.regular, in: .rect(cornerRadius: 30))
                    .padding()
                    
                    *// Background switcher*

                    HStack {
                        ForEach(0..<backgroundImages.count, id: \.self) { index in
                            Button {
                                withAnimation(.spring()) {
                                    currentBackground = index
                                }
                            } label: {
                                Circle()
                                    .fill(currentBackground == index ? .white : .white.opacity(0.5))
                                    .frame(width: 10, height: 10)
                            }
                        }
                    }
                    .padding()
                    .glassEffect(.thin, in: .capsule)
                }
            }
        }
    }
}

struct GlassSampleView: View {
    let sample: GlassEffectPreviews.GlassSample
    @State private var isPressed = false
    
    var body: some View {
        VStack(spacing: 12) {
            Text(sample.name)
                .font(.headline)
                .foregroundStyle(.white)
            
            Rectangle()
                .fill(LinearGradient(
                    colors: [.blue.opacity(0.3), .purple.opacity(0.3)],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                ))
                .frame(height: 100)
                .overlay(
                    Image(systemName: "sparkles")
                        .font(.largeTitle)
                        .foregroundStyle(.white.opacity(0.8))
                )
                .glassEffect(sample.intensity, in: sample.shape)
                .scaleEffect(isPressed ? 0.95 : 1.0)
                .onTapGesture {
                    withAnimation(.spring(response: 0.3)) {
                        isPressed = true
                    }
                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                        isPressed = false
                    }
                }
        }
    }
}

*// Preview provider*

struct GlassEffectPreviews_Previews: PreviewProvider {
    static var previews: some View {
        GlassEffectPreviews()
            .preferredColorScheme(.dark)
    }
}
**## 7.2 Performance Testing Guidelines**
**File: RehearSmart/Testing/PerformanceTests.swift**

swift
import XCTest
@testable import RehearSmart

class LiquidGlassPerformanceTests: XCTestCase {
    
    func testGlassEffectRenderingPerformance() {
        measure {
            *// Test rendering 100 glass views*

            let views = (0..<100).map { index in
                GlassCard(depth: .medium) {
                    Text("Test \(index)")
                }
            }
            
            *// Force render*

            _ = views.map { view in
                view.body
            }
        }
    }
    
    func testGlassAnimationPerformance() {
        measure {
            *// Test morphing animations*

            var state = false
            for _ in 0..<50 {
                withAnimation(.spring()) {
                    state.toggle()
                }
            }
        }
    }
    
    func testBackgroundRenderingPerformance() {
        measure {
            *// Test dynamic background rendering*

            let background = DynamicGradientBackground()
            _ = background.body
        }
    }
}
**## Phase 8: Documentation and Best Practices**
**## 8.1 Liquid Glass Implementation Guide**
**File: RehearSmart/Documentation/LiquidGlassGuide.md**

markdown
# RehearSmart Liquid Glass Implementation Guide

## Overview
This guide documents the Liquid Glass design system implementation in RehearSmart, providing best practices and usage examples.

## Core Principles

### 1. Layering Hierarchy
- ****Content Layer****: Your actual app content (text, images, videos)
- ****Glass Layer****: Functional controls and navigation elements
- ****Ambient Layer****: Dynamic backgrounds and particle effects

### 2. Glass Intensity Guidelines
- ****Prominent (.prominent)****: Navigation bars, tab bars, primary actions
- ****Regular (.regular)****: Cards, grouped content, secondary containers
- ****Thin (.thin)****: Subtle overlays, hints, tertiary elements
- ****Thick (.thick)****: Modal overlays, focused content, important alerts

### 3. Animation Best Practices
- Use spring animations for natural feel
- Standard timing: 0.5s response, 0.8 damping
- Quick interactions: 0.3s response, 0.7 damping
- Smooth transitions: 0.6s response, 0.9 damping

### 4. Color Usage
- Prefer white/light text on glass surfaces
- Use vibrant colors sparingly for accents
- Ensure WCAG AA contrast ratios
- Test in both light and dark modes

### 5. Performance Optimization
- Limit glass effects to 3-5 simultaneous views
- Use lazy loading for off-screen glass elements
- Cache complex glass effects when possible
- Disable effects on older devices (iPhone 12 and earlier)

## Component Usage

### Glass Buttons
```swift
GlassButton(title: "Record", icon: "mic.fill") {
    // Action
}
**## Glass Cards**

swift
GlassCard(depth: .medium) {
    *// Content*

}
**## Floating Elements**

swift
HStack {
    *// Content*

}
.floatingGlass()
**## Dynamic Backgrounds**

swift
ZStack {
    DynamicGradientBackground()
    *// Your content*

}
**## Accessibility**
**## Reduce Transparency**
Always provide fallbacks:

swift
.adaptiveGlass(.regular)
**## Motion Sensitivity**
Use adaptive animations:

swift
.adaptiveAnimation(.spring(), value: state)
**## Voice Control**
Ensure all glass elements have proper labels:

swift
.accessibilityLabel("Record new speech")
.accessibilityHint("Double tap to start recording")
**## Testing Checklist**
* Test on all device sizes
* Verify in both orientations
* Check with accessibility settings enabled
* Monitor memory usage during animations
* Validate battery impact
* Test with different wallpapers/backgrounds
* Verify text legibility in all conditions
* Check performance on older devices

**## Common Issues and Solutions**
**## Issue: Text hard to read on glass**
**Solution**: Use .foregroundStyle(.primary) or increase glass thickness
**## Issue: Performance lag with multiple glass views**
**Solution**: Implement lazy loading and view recycling
**## Issue: Glass effects not showing**
**Solution**: Ensure you're building with iOS 26 SDK and deployment target
**## Issue: Animations feel janky**
**Solution**: Use withAnimation blocks and avoid layout changes during animation

## Phase 9: Migration and Deployment

### 9.1 Migration Script

**File: RehearSmart/Migration/MigrateToLiquidGlass.swift**
```swift
import SwiftUI

struct MigrationManager {
    static func migrateToLiquidGlass() {
        // Step 1: Update all navigation views
        updateNavigationViews()
        
        // Step 2: Convert buttons to glass style
        convertButtonsToGlass()
        
        // Step 3: Update color scheme
        updateColorScheme()
        
        // Step 4: Add dynamic backgrounds
        addDynamicBackgrounds()
        
        // Step 5: Implement accessibility fallbacks
        implementAccessibilityFallbacks()
        
        print("✅ Liquid Glass migration complete!")
    }
    
    private static func updateNavigationViews() {
        // Migration logic for navigation
        print("📱 Updating navigation to floating glass style...")
    }
    
    private static func convertButtonsToGlass() {
        // Migration logic for buttons
        print("🔘 Converting buttons to glass style...")
    }
    
    private static func updateColorScheme() {
        // Migration logic for colors
        print("🎨 Updating color scheme for glass compatibility...")
    }
    
    private static func addDynamicBackgrounds() {
        // Migration logic for backgrounds
        print("🌈 Adding dynamic gradient backgrounds...")
    }
    
    private static func implementAccessibilityFallbacks() {
        // Migration logic for accessibility
        print("♿ Implementing accessibility fallbacks...")
    }
}
**## Implementation Timeline**
**## Week 1: Foundation**
* Set up Liquid Glass design system
* Create base glass components
* Implement dynamic backgrounds
* Test basic glass effects

**## Week 2: Core Views**
* Redesign home screen with glass elements
* Update recording interface
* Implement comparison view
* Add morphing animations

**## Week 3: Polish and Optimization**
* Fine-tune animations
* Optimize performance
* Implement accessibility features
* Test on various devices

**## Week 4: Integration and Testing**
* Complete app-wide integration
* Comprehensive testing
* Bug fixes and refinements
* Prepare for deployment

**## Success Metrics**
1. **Visual Impact**: 90% of beta testers rate the new design as "impressive" or "stunning"
2. **Performance**: Maintain 60fps during all animations
3. **Accessibility**: Pass all WCAG AA standards
4. **Battery Life**: Less than 5% additional battery usage
5. **User Engagement**: 30% increase in session duration

**## Conclusion**
This comprehensive redesign plan transforms RehearSmart into a showcase of Apple's Liquid Glass design system. The implementation balances visual innovation with practical usability, ensuring the app not only looks stunning but also enhances the user experience.
Key deliverables:
* Complete UI overhaul with Liquid Glass effects
* Smooth, organic animations throughout
* Intelligent glass effects that adapt to content
* Full accessibility support
* Optimized performance across all devices

The result will be an app that feels alive, responsive, and truly next-generation—setting RehearSmart apart in the iOS app ecosystem.
