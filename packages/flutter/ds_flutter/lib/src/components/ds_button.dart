import 'package:flutter/material.dart';
import '../tokens/ds_tokens.dart';
import '../tokens/ds_tokens_dark.dart';

// Matches React Button variants 1:1.
enum DSButtonVariant {
  primary,
  secondary,
  tertiary,
  monoPrimary,
  monoSecondary,
  monoTertiary,
  destructive,
  destructiveSecondary,
  destructiveTertiary,
  text,
  textMono,
  textDestructive,
}

enum DSButtonSize { sm, md, lg, xl }

class DSButton extends StatelessWidget {
  const DSButton({
    super.key,
    required this.label,
    this.onPressed,
    this.variant = DSButtonVariant.primary,
    this.size = DSButtonSize.md,
    this.loading = false,
    this.leadingIcon,
    this.trailingIcon,
  });

  final String label;
  final VoidCallback? onPressed;
  final DSButtonVariant variant;
  final DSButtonSize size;
  final bool loading;
  final Widget? leadingIcon;
  final Widget? trailingIcon;

  // ─── Helpers ────────────────────────────────────────────────────────────────

  bool get _isTextVariant =>
      variant == DSButtonVariant.text ||
      variant == DSButtonVariant.textMono ||
      variant == DSButtonVariant.textDestructive;

  // ─── Per-size typography ─────────────────────────────────────────────────────

  ({double fontSize, double lineHeight, double letterSpacing, FontWeight fontWeight})
      get _typoSpec => switch (size) {
            DSButtonSize.sm => (
              fontSize: DSTokens.buttonSmFontSize,
              lineHeight: DSTokens.buttonSmLineHeight,
              letterSpacing: DSTokens.buttonSmLetterSpacing,
              fontWeight: DSTokens.buttonSmFontWeight,
            ),
            DSButtonSize.md => (
              fontSize: DSTokens.buttonMdFontSize,
              lineHeight: DSTokens.buttonMdLineHeight,
              letterSpacing: DSTokens.buttonMdLetterSpacing,
              fontWeight: DSTokens.buttonMdFontWeight,
            ),
            DSButtonSize.lg => (
              fontSize: DSTokens.buttonLgFontSize,
              lineHeight: DSTokens.buttonLgLineHeight,
              letterSpacing: DSTokens.buttonLgLetterSpacing,
              fontWeight: DSTokens.buttonLgFontWeight,
            ),
            DSButtonSize.xl => (
              fontSize: DSTokens.buttonXlFontSize,
              lineHeight: DSTokens.buttonXlLineHeight,
              letterSpacing: DSTokens.buttonXlLetterSpacing,
              fontWeight: DSTokens.buttonXlFontWeight,
            ),
          };

  double get _iconSize => switch (size) {
        DSButtonSize.sm => 12.0,
        DSButtonSize.md => 14.0,
        DSButtonSize.lg => 16.0,
        DSButtonSize.xl => 16.0,
      };

  // ─── Color schemes ──────────────────────────────────────────────────────────
  // Selects between light and dark token sets based on current brightness.
  // Each record is (defaultBg, hoverBg, pressedBg, disabledBg).

  (Color, Color, Color, Color) _bgColors(bool isDark) {
    Color c(Color light, Color dark) => isDark ? dark : light;
    return switch (variant) {
      DSButtonVariant.primary => (
        c(DSTokens.colorFillBrand, DSTokensDark.colorFillBrand),
        c(DSTokens.colorFillBrandHover, DSTokensDark.colorFillBrandHover),
        c(DSTokens.colorFillBrandPressed, DSTokensDark.colorFillBrandPressed),
        c(DSTokens.colorFillDisabled, DSTokensDark.colorFillDisabled),
      ),
      DSButtonVariant.secondary => (
        c(DSTokens.colorFillBrandSubtle, DSTokensDark.colorFillBrandSubtle),
        c(DSTokens.colorFillBrandSubtleHover, DSTokensDark.colorFillBrandSubtleHover),
        c(DSTokens.colorFillBrandSubtlePressed, DSTokensDark.colorFillBrandSubtlePressed),
        c(DSTokens.colorFillDisabled, DSTokensDark.colorFillDisabled),
      ),
      DSButtonVariant.tertiary => (
        Colors.transparent,
        c(DSTokens.colorFillBrandSubtle, DSTokensDark.colorFillBrandSubtle),
        c(DSTokens.colorFillBrandSubtle, DSTokensDark.colorFillBrandSubtle),
        Colors.transparent,
      ),
      DSButtonVariant.monoPrimary => (
        c(DSTokens.colorFillMono, DSTokensDark.colorFillMono),
        c(DSTokens.colorFillMonoHover, DSTokensDark.colorFillMonoHover),
        c(DSTokens.colorFillMonoPressed, DSTokensDark.colorFillMonoPressed),
        c(DSTokens.colorFillDisabled, DSTokensDark.colorFillDisabled),
      ),
      DSButtonVariant.monoSecondary => (
        c(DSTokens.colorFillNeutral, DSTokensDark.colorFillNeutral),
        c(DSTokens.colorFillNeutralHover, DSTokensDark.colorFillNeutralHover),
        c(DSTokens.colorFillNeutralPressed, DSTokensDark.colorFillNeutralPressed),
        c(DSTokens.colorFillDisabled, DSTokensDark.colorFillDisabled),
      ),
      DSButtonVariant.monoTertiary => (
        Colors.transparent,
        c(DSTokens.colorFillNeutral, DSTokensDark.colorFillNeutral),
        c(DSTokens.colorFillNeutral, DSTokensDark.colorFillNeutral),
        Colors.transparent,
      ),
      DSButtonVariant.destructive => (
        c(DSTokens.colorFillError, DSTokensDark.colorFillError),
        c(DSTokens.colorFillErrorHover, DSTokensDark.colorFillErrorHover),
        c(DSTokens.colorFillErrorPressed, DSTokensDark.colorFillErrorPressed),
        c(DSTokens.colorFillDisabled, DSTokensDark.colorFillDisabled),
      ),
      DSButtonVariant.destructiveSecondary => (
        c(DSTokens.colorFillErrorSubtle, DSTokensDark.colorFillErrorSubtle),
        c(DSTokens.colorFillErrorSubtleHover, DSTokensDark.colorFillErrorSubtleHover),
        c(DSTokens.colorFillErrorSubtlePressed, DSTokensDark.colorFillErrorSubtlePressed),
        c(DSTokens.colorFillDisabled, DSTokensDark.colorFillDisabled),
      ),
      DSButtonVariant.destructiveTertiary => (
        Colors.transparent,
        c(DSTokens.colorFillErrorSubtle, DSTokensDark.colorFillErrorSubtle),
        c(DSTokens.colorFillErrorSubtle, DSTokensDark.colorFillErrorSubtle),
        Colors.transparent,
      ),
      DSButtonVariant.text ||
      DSButtonVariant.textMono ||
      DSButtonVariant.textDestructive => (
        Colors.transparent,
        Colors.transparent,
        Colors.transparent,
        Colors.transparent,
      ),
    };
  }

  // Each record is (defaultFg, hoverFg, pressedFg, disabledFg).
  (Color, Color, Color, Color) _fgColors(bool isDark) {
    Color c(Color light, Color dark) => isDark ? dark : light;
    return switch (variant) {
      DSButtonVariant.primary ||
      DSButtonVariant.monoPrimary ||
      DSButtonVariant.destructive => (
        c(DSTokens.colorTextPrimaryInverse, DSTokensDark.colorTextPrimaryInverse),
        c(DSTokens.colorTextPrimaryInverse, DSTokensDark.colorTextPrimaryInverse),
        c(DSTokens.colorTextPrimaryInverse, DSTokensDark.colorTextPrimaryInverse),
        c(DSTokens.colorTextDisabled, DSTokensDark.colorTextDisabled),
      ),
      DSButtonVariant.secondary => (
        c(DSTokens.colorTextBrand, DSTokensDark.colorTextBrand),
        c(DSTokens.colorTextLinkHover, DSTokensDark.colorTextLinkHover),
        c(DSTokens.colorTextLinkPressed, DSTokensDark.colorTextLinkPressed),
        c(DSTokens.colorTextDisabled, DSTokensDark.colorTextDisabled),
      ),
      DSButtonVariant.tertiary => (
        c(DSTokens.colorTextBrand, DSTokensDark.colorTextBrand),
        c(DSTokens.colorTextBrand, DSTokensDark.colorTextBrand),
        c(DSTokens.colorTextLinkPressed, DSTokensDark.colorTextLinkPressed),
        c(DSTokens.colorTextDisabled, DSTokensDark.colorTextDisabled),
      ),
      DSButtonVariant.monoSecondary => (
        c(DSTokens.colorTextPrimary, DSTokensDark.colorTextPrimary),
        c(DSTokens.colorTextPrimary, DSTokensDark.colorTextPrimary),
        c(DSTokens.colorTextPrimary, DSTokensDark.colorTextPrimary),
        c(DSTokens.colorTextDisabled, DSTokensDark.colorTextDisabled),
      ),
      DSButtonVariant.monoTertiary => (
        c(DSTokens.colorTextPrimary, DSTokensDark.colorTextPrimary),
        c(DSTokens.colorTextLinkMonoHover, DSTokensDark.colorTextLinkMonoHover),
        c(DSTokens.colorTextLinkMonoPressed, DSTokensDark.colorTextLinkMonoPressed),
        c(DSTokens.colorTextDisabled, DSTokensDark.colorTextDisabled),
      ),
      DSButtonVariant.destructiveSecondary ||
      DSButtonVariant.destructiveTertiary => (
        c(DSTokens.colorTextError, DSTokensDark.colorTextError),
        c(DSTokens.colorTextErrorHover, DSTokensDark.colorTextErrorHover),
        c(DSTokens.colorTextErrorPressed, DSTokensDark.colorTextErrorPressed),
        c(DSTokens.colorTextDisabled, DSTokensDark.colorTextDisabled),
      ),
      DSButtonVariant.text => (
        c(DSTokens.colorTextBrand, DSTokensDark.colorTextBrand),
        c(DSTokens.colorTextLinkHover, DSTokensDark.colorTextLinkHover),
        c(DSTokens.colorTextLinkPressed, DSTokensDark.colorTextLinkPressed),
        c(DSTokens.colorTextDisabled, DSTokensDark.colorTextDisabled),
      ),
      DSButtonVariant.textMono => (
        c(DSTokens.colorTextLinkMono, DSTokensDark.colorTextLinkMono),
        c(DSTokens.colorTextLinkMonoHover, DSTokensDark.colorTextLinkMonoHover),
        c(DSTokens.colorTextLinkMonoPressed, DSTokensDark.colorTextLinkMonoPressed),
        c(DSTokens.colorTextDisabled, DSTokensDark.colorTextDisabled),
      ),
      DSButtonVariant.textDestructive => (
        c(DSTokens.colorTextError, DSTokensDark.colorTextError),
        c(DSTokens.colorTextErrorHover, DSTokensDark.colorTextErrorHover),
        c(DSTokens.colorTextErrorPressed, DSTokensDark.colorTextErrorPressed),
        c(DSTokens.colorTextDisabled, DSTokensDark.colorTextDisabled),
      ),
    };
  }

  // ─── Size spec ──────────────────────────────────────────────────────────────

  ({double height, EdgeInsets padding, double radius}) get _sizeSpec =>
      switch (size) {
        DSButtonSize.sm => (
          height: 24.0,
          padding: const EdgeInsets.symmetric(
            horizontal: DSTokens.spacingXs,
          ),
          radius: DSTokens.borderRadiusXs,
        ),
        DSButtonSize.md => (
          height: 32.0,
          padding: const EdgeInsets.symmetric(
            vertical: DSTokens.spacing2xs,
            horizontal: DSTokens.spacingS,
          ),
          radius: DSTokens.borderRadiusS,
        ),
        DSButtonSize.lg => (
          height: 40.0,
          padding: const EdgeInsets.symmetric(
            vertical: DSTokens.spacingS,
            horizontal: DSTokens.spacingM,
          ),
          radius: DSTokens.borderRadiusS,
        ),
        DSButtonSize.xl => (
          height: 48.0,
          padding: const EdgeInsets.symmetric(
            vertical: DSTokens.spacingM,
            horizontal: DSTokens.spacingL,
          ),
          radius: DSTokens.borderRadiusS,
        ),
      };

  // ─── Style builder ──────────────────────────────────────────────────────────

  ButtonStyle _buildStyle(
    ({double fontSize, double lineHeight, double letterSpacing, FontWeight fontWeight}) typo,
    bool isDark,
  ) {
    final (defaultBg, hoverBg, pressedBg, disabledBg) = _bgColors(isDark);
    final (defaultFg, hoverFg, pressedFg, disabledFg) = _fgColors(isDark);
    final spec = _sizeSpec;
    final isText = _isTextVariant;

    return ButtonStyle(
      backgroundColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.disabled)) return disabledBg;
        if (states.contains(WidgetState.pressed)) return pressedBg;
        if (states.contains(WidgetState.hovered)) return hoverBg;
        return defaultBg;
      }),
      foregroundColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.disabled)) return disabledFg;
        if (states.contains(WidgetState.pressed)) return pressedFg;
        if (states.contains(WidgetState.hovered)) return hoverFg;
        return defaultFg;
      }),
      overlayColor: WidgetStateProperty.all(Colors.transparent),
      shadowColor: WidgetStateProperty.all(Colors.transparent),
      elevation: WidgetStateProperty.all(0.0),
      splashFactory: NoSplash.splashFactory,
      padding: WidgetStateProperty.all(
        isText ? EdgeInsets.zero : spec.padding,
      ),
      minimumSize: WidgetStateProperty.all(
        isText ? Size.zero : Size(0, spec.height),
      ),
      tapTargetSize: MaterialTapTargetSize.shrinkWrap,
      shape: WidgetStateProperty.all(
        RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(spec.radius),
        ),
      ),
      textStyle: WidgetStateProperty.all(TextStyle(
        fontFamily: 'Work Sans',
        fontSize: typo.fontSize,
        fontWeight: typo.fontWeight,
        letterSpacing: typo.letterSpacing,
        height: typo.lineHeight / typo.fontSize,
      )),
    );
  }

  // ─── Child ──────────────────────────────────────────────────────────────────

  Widget _buildChild(Color spinnerColor, double fontSize) {
    if (loading) {
      return SizedBox.square(
        dimension: fontSize,
        child: CircularProgressIndicator(
          strokeWidth: 2,
          color: spinnerColor,
        ),
      );
    }

    final text = Text(label.toUpperCase());

    if (leadingIcon == null && trailingIcon == null) return text;

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (leadingIcon != null) ...[
          SizedBox(
            width: _iconSize,
            height: _iconSize,
            child: leadingIcon,
          ),
          SizedBox(width: DSTokens.spacingXs),
        ],
        text,
        if (trailingIcon != null) ...[
          SizedBox(width: DSTokens.spacingXs),
          SizedBox(
            width: _iconSize,
            height: _iconSize,
            child: trailingIcon,
          ),
        ],
      ],
    );
  }

  // ─── Build ──────────────────────────────────────────────────────────────────

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final (defaultFg, _, _, disabledFg) = _fgColors(isDark);
    final typo = _typoSpec;

    final effectiveOnPressed = loading ? () {} : onPressed;
    final spinnerColor = onPressed == null ? disabledFg : defaultFg;

    return TextButton(
      onPressed: effectiveOnPressed,
      style: _buildStyle(typo, isDark),
      child: _buildChild(spinnerColor, typo.fontSize),
    );
  }
}
