import 'package:flutter/material.dart';
import '../tokens/ds_tokens.dart';

enum DSBadgeVariant {
  neutral,
  brand,
  success,
  error,
  alert,
  info,
  revision,
  completed,
  review,
}

class DSBadge extends StatelessWidget {
  const DSBadge({
    super.key,
    required this.label,
    this.variant = DSBadgeVariant.neutral,
  });

  final String label;
  final DSBadgeVariant variant;

  (Color bg, Color fg) get _colors => switch (variant) {
    DSBadgeVariant.neutral   => (DSTokens.colorFillNeutral,         DSTokens.colorTextSecondary),
    DSBadgeVariant.brand     => (DSTokens.colorFillBrandSubtle,     DSTokens.colorTextBrand),
    DSBadgeVariant.success   => (DSTokens.colorFillSuccessSubtle,   DSTokens.colorTextSuccess),
    DSBadgeVariant.error     => (DSTokens.colorFillErrorSubtle,     DSTokens.colorTextError),
    DSBadgeVariant.alert     => (DSTokens.colorFillAlertSubtle,     DSTokens.colorTextAlert),
    DSBadgeVariant.info      => (DSTokens.colorFillInfoSubtle,      DSTokens.colorTextInfo),
    DSBadgeVariant.revision  => (DSTokens.colorFillRevisionSubtle,  DSTokens.colorTextRevision),
    DSBadgeVariant.completed => (DSTokens.colorFillCompletedSubtle, DSTokens.colorTextCompleted),
    DSBadgeVariant.review    => (DSTokens.colorFillReviewSubtle,    DSTokens.colorTextReview),
  };

  @override
  Widget build(BuildContext context) {
    final (bg, fg) = _colors;
    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: DSTokens.spacingXs,
        vertical: 2,
      ),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(DSTokens.borderRadiusPill),
      ),
      child: Text(
        label,
        style: TextStyle(
          fontFamily: 'Work Sans',
          fontSize: DSTokens.fontSizeXs,
          fontWeight: DSTokens.fontWeightMedium,
          color: fg,
          height: DSTokens.lineHeightXs / DSTokens.fontSizeXs,
        ),
      ),
    );
  }
}
