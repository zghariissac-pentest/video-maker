import React from 'react';
import { Series } from 'remotion';
import { Intro } from './scenes/Intro';
import { ScenePoint } from './components/ScenePoint';
import { Tor } from 'developer-icons';
import {
    ShieldAlert,
    Search,
    Wifi,
    Globe,
    Fingerprint,
    UserX,
    CheckCircle,
    Zap
} from 'lucide-react';

export const TorVPNTruth: React.FC = () => {
    return (
        <Series>
            {/* Intro */}
            <Series.Sequence durationInFrames={300}>
                <Intro />
            </Series.Sequence>

            {/* Point 1: Traffic Correlation */}
            <Series.Sequence durationInFrames={400}>
                <ScenePoint
                    title="أولًا: تحليل الارتباط المروري – Traffic Correlation"
                    subtitle="TRAFFIC ANALYSIS"
                    Icon={Search}
                    description="حتى لو تم إخفاء عنوان IP، يمكن تحليل توقيت وحجم البيانات. إذا كانت جهة ما تراقب نقطة دخولك إلى الشبكة ونقطة خروج البيانات، يمكنها مطابقة الأنماط وربط النشاط بك — دون الحاجة لرؤية المحتوى نفسه."
                />
            </Series.Sequence>

            {/* Point 2: VPN Trust */}
            <Series.Sequence durationInFrames={400}>
                <ScenePoint
                    title="ثانيًا: الثقة في مزود الـ VPN"
                    subtitle="VPN TRUST LIMITS"
                    Icon={ShieldAlert}
                    description="عند استخدام VPN، أنت لا تختفي… أنت فقط تنقل ثقتك من مزود الإنترنت إلى شركة أخرى. إذا كانت الشركة تحتفظ بسجلات، أو خاضعة لضغوط قانونية، يمكن كشف نشاطك."
                />
            </Series.Sequence>

            {/* Point 3: Tor Nodes */}
            <Series.Sequence durationInFrames={400}>
                <ScenePoint
                    title="ثالثًا: عُقد Tor (Nodes)"
                    subtitle="TOR INFRASTRUCTURE"
                    Icon={() => <Tor size={120} className="text-green-500" />}
                    description="Tor يمرر الاتصال عبر ثلاث عقد، لكن عقدة الخروج تستطيع رؤية البيانات غير المشفرة. وفي بعض الحالات، قد تكون بعض العقد مراقَبة أو خبيثة."
                />
            </Series.Sequence>

            {/* Point 4: Leaks */}
            <Series.Sequence durationInFrames={400}>
                <ScenePoint
                    title="رابعًا: التسريبات – Leaks"
                    subtitle="DATA LEAKS"
                    Icon={Wifi}
                    description="تسريب DNS، تسريب WebRTC، إعدادات متصفح خاطئة. خطأ تقني بسيط قد يكشف عنوانك الحقيقي بالكامل."
                />
            </Series.Sequence>

            {/* Point 5: Global Adversary */}
            <Series.Sequence durationInFrames={400}>
                <ScenePoint
                    title="خامسًا: هجمات الارتباط والخصم العالمي – Global Adversary"
                    subtitle="GLOBAL SURVEILLANCE"
                    Icon={Globe}
                    description="إذا كانت جهة تمتلك قدرة مراقبة واسعة على مستوى عالمي، يمكنها تحليل الأنماط وربطها ببعضها. Tor لم يُصمَّم لهزيمة خصم يراقب الإنترنت بالكامل."
                />
            </Series.Sequence>

            {/* Point 6: Fingerprinting */}
            <Series.Sequence durationInFrames={400}>
                <ScenePoint
                    title="سادسًا: بصمة الجهاز – Device Fingerprinting"
                    subtitle="BROWSER IDENTITY"
                    Icon={Fingerprint}
                    description="حتى لو تغير عنوان IP، متصفحك يترك بصمة فريدة: دقة الشاشة، الخطوط، المنطقة الزمنية، إعدادات الرسوميات… كلها قد تميزك عن غيرك."
                />
            </Series.Sequence>

            {/* Point 7: The biggest mistake */}
            <Series.Sequence durationInFrames={400}>
                <ScenePoint
                    title="والخطأ الأكبر؟ تسجيل الدخول إلى حساباتك الحقيقية"
                    subtitle="FATAL ERROR"
                    Icon={UserX}
                    description="تسجيل الدخول إلى حساباتك الحقيقية أثناء استخدام Tor. عندها تنتهي فكرة “الاختفاء”."
                />
            </Series.Sequence>

            {/* Summary */}
            <Series.Sequence durationInFrames={350}>
                <ScenePoint
                    title="الخلاصة: الحماية طبقات"
                    subtitle="CONCLUSION"
                    Icon={CheckCircle}
                    description="VPN وTor يضيفان طبقات حماية. لكن الاختفاء التام على الإنترنت فكرة غير واقعية."
                />
            </Series.Sequence>

            {/* Final Piece of Advice */}
            <Series.Sequence durationInFrames={400}>
                <ScenePoint
                    title="الأمان الحقيقي"
                    subtitle="FINAL WISDOM"
                    Icon={Zap}
                    description="الأمان الحقيقي يبدأ بفهم نموذج التهديد الخاص بك، وليس بالاعتماد على أداة واحدة."
                />
            </Series.Sequence>
        </Series>
    );
};
